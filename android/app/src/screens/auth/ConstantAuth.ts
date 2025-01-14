const USERNAME = {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    REQUIRED_MESSAGE: "아이디를 입력해주세요.",
    LENGTH_MESSAGE: "3 ~ 20 사이의 글자로 작성해주세요.",
  };
  
const PASSWORD = {
    MIN_LENGTH: 8,
    MAX_LENGTH: 20,
    REQUIRED_MESSAGE: "비밀번호를 입력해주세요.",
    LENGTH_MESSAGE: "8 ~ 20 사이의 글자로 작성해주세요.",
    CHECK_MESSAGE: "비밀번호가 일치하지 않습니다.",
};
  
const EMAIL = {
    REQUIRED_MESSAGE: "이메일을 입력해주세요.",
    PATTERN: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    CHECK_MESSAGE: "이메일 형식으로 입력해주세요.",
  };
  
const SUCCESS = {
    Register: "회원가입이 완료되었습니다.",
    Login: "환영합니다!",
};
  
const FAIL = {
    Login: "아이디와 비밀번호를 확인해주세요.",
};
  
export default { USERNAME, PASSWORD, EMAIL, SUCCESS, FAIL };
  