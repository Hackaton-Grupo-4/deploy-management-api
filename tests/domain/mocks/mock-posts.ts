import { LoadHistory } from "../usecases";

export const mockPosts = (): LoadHistory.Result => ([{
  user: {
    name: "any_user",
    role: "any_role",
  },
  application: {
    description: "any_application"
  },
  platform: {
    description: "any_platform"
  },
  postHasPostClassifications: [{
    postClassification: {
      description: "any_post_classification"
    }
  }],
  version: "any_version",
  title: "any_title",
  syntax: "any_syntax",
  description: "any_description"
}])