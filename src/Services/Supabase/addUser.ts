import { supabase } from "./supabaseClient";

const addUser = async (username:string, email: string, password: string) => {
    let addPersonalDetailsResponse
  try {
    let { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    await supabase.from("profiles").update({
      "username": username
    }).eq("id", user?.id);
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
