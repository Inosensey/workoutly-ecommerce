const StringRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const EmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const useInputValidation = (Name: string, Value: string) => {
  if (Value === "") {
    return {
      InputName: Name,
      Notification: `${Name} is required`,
      valid: false,
    };
  }
  if (Name === "Username") {
    if (StringRegex.test(Value)) {
      return {
        InputName: Name,
        Notification: `${Name} should not container special characters or spaces`,
        valid: false,
      };
    }
    return {
      InputName: Name,
      Notification: "",
      valid: true,
    };
  }
  if (Name === "Email") {
    if (!EmailRegex.test(Value)) {
      return {
        InputName: Name,
        Notification: `${Name} should be valid`,
        valid: false,
      };
    }
    return {
      InputName: Name,
      Notification: "",
      valid: true,
    };
  }
  if (Name === "Password") {
    if (Value.length < 6) {
      return {
        InputName: Name,
        Notification: `${Name} must be 6 characters long`,
        valid: false,
      };
    }
    return {
      InputName: Name,
      Notification: "",
      valid: true,
    };
  }
};

export default useInputValidation;
