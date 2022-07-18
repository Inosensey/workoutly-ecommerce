import { supabase } from "../supabaseClient";

const loginUser = async (email: string, password: string) => {
  try {
    let { user, error, session } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    const response = {
      User: user,
      Session: session,
      Error: error,
    };
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default loginUser;
