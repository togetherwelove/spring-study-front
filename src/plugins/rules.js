const patterns = {
  email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  name: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
};

const rules = {
  email: [
    (value) => {
      if (value) return true;
      return "이메일을 입력해주세요.";
    },
    (value) => {
      if (patterns.email.test(value)) return true;
      return "유효한 이메일 형식이 아닙니다.";
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
      return "유효한 비밀번호 형식이 아닙니다.";
    },
  ],
  name: [
    (value) => {
      if (value) return true;
      return "이름을 입력해주세요.";
    },
    (value) => {
      if (patterns.name.test(value)) return true;
      return "유효한 이름 형식이 아닙니다.";
    },
  ],
};

export default rules;
