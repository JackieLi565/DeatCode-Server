type UserProfileType = {
  username: string;
  streak: number;
  desc: string;
  loggedDays: string[];
};

type ProblemType = {};

type CodeProfileType = {
  DeatPoints: number;
  latestCompletion: number;
  codePublish: ProblemType[];
  completedProblems: string[];
};

type UserCred = {
  email: string;
  password: string;
};

type UserDocumentType = {
  userProfile: UserProfileType;
  codeProfile: CodeProfileType;
  cred: UserCred;
};

export { UserDocumentType, ProblemType };
