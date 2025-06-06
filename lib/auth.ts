export interface AuthUser {
  uid: string;
  email: string | null;
  isAdmin: boolean;
}

// Admin email addresses (you can move this to environment variables)
const ADMIN_EMAILS = [
  'admin@vanonroad.com',
];

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

// Supabase client setup
let supabase: any = null;

async function getSupabaseClient() {
  if (supabase) return supabase;
  
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
    }
    
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    return supabase;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    throw error;
  }
}

export async function signInAdmin(email: string, password: string): Promise<AuthUser> {
  if (typeof window === 'undefined') {
    throw new Error('Authentication only available on client side');
  }

  try {
    const supabase = await getSupabaseClient();
    
    if (!isAdminEmail(email)) {
      throw new Error('Access denied. Admin privileges required.');
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error('Authentication failed');
    }

    return {
      uid: data.user.id,
      email: data.user.email,
      isAdmin: true
    };
  } catch (error: any) {
    throw new Error(error.message || 'Authentication failed');
  }
}

export async function signOutAdmin(): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message || 'Sign out failed');
  }
}

export function onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
  if (typeof window === 'undefined') {
    callback(null);
    return () => {};
  }

  let unsubscribe: (() => void) | null = null;

  getSupabaseClient().then((supabase) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      if (session?.user && isAdminEmail(session.user.email || '')) {
        callback({
          uid: session.user.id,
          email: session.user.email,
          isAdmin: true
        });
      } else {
        callback(null);
      }
    });
    
    unsubscribe = () => subscription.unsubscribe();
  }).catch(() => {
    callback(null);
  });
  
  return () => {
    if (unsubscribe) unsubscribe();
  };
}