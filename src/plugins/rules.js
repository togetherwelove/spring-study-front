const patterns = {
  email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  password: /^(?=.*\d)(?=.*[a-z])[a-z\d!@#$%^&*]{8,}$/,
  name: /^[가-힣a-zA-Z]{2,29}$/,
};

const rules = {
  email: [
    (value) => {
      if (value) return true;
      return "이메일을 입력해주세요.";
    },
    (value) => {
      if (patterns.email.test(value)) return true;
      return "이메일이 유효하지 않습니다.";
    },
  ],
  password: [
    (value) => {
      if (value) return true;
      return "비밀번호를 입력해주세요.";
    },
    (value) => {
      if (value.length >= 8) return true;
      return "비밀번호는 8자 이상입니다.";
    },
    (value) => {
      if (patterns.password.test(value)) return true;
      return "비밀번호가 유효하지 않습니다.";
    },
  ],
  name: [
    (value) => {
      if (value === "" || value.length >= 2) return true;
      return "이름은 2자 이상입니다.";
    },
    (value) => {
      if (value === "" || patterns.name.test(value)) return true;
      return "이름이 유효하지 않습니다.";
    },
  ],
};

export default rules;
