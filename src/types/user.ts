type UserProfileType = {
  email: string;
  username: string;
  streak: number;
  desc: string;
  loggedDays: string[];
};

type ProblemType = {};

type CodeProfileType = {
  DeatPoints: number;
  latestCompletion: string;
  codePublish: ProblemType[];
};

type UserDocumentType = {
  userProfile: UserProfileType;
  codeProfile: CodeProfileType;
  password: string;
};

export { UserDocumentType, ProblemType };
