import { supabase } from "../supabaseClient";

const addUser = async (email: string, password: string) => {
  try {
    let { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    const response = {
      User: user,
      Error: error,
    };
    return response;
  } catch (error) {
    console.log({ Error: error });
  }
};

export default addUser;
