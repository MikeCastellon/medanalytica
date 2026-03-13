import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  GraphQLBigInt: any;
  GraphQLStringOrFloat: any;
  Hash: any;
  JSON: any;
  bigint: any;
  bpchar: any;
  inet: any;
  json: any;
  jsonb: any;
  numeric: any;
  smallint: any;
  timestamptz: any;
  uuid: any;
};

export type AuthRegistrations = {
  __typename?: 'AuthRegistrations';
  applicationId: Scalars['uuid'];
  id: Scalars['uuid'];
  insertInstant: Scalars['Int'];
  lastLoginInstant: Scalars['Int'];
  lastUpdateInstant: Scalars['Int'];
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  usernameStatus: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  active: Scalars['Boolean'];
  birthDate: Scalars['String'];
  connectorId: Scalars['uuid'];
  data?: Maybe<AuthUserMeta>;
  email: Scalars['String'];
  encryptionScheme: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['uuid'];
  imageUrl?: Maybe<Scalars['String']>;
  insertInstant: Scalars['Int'];
  lastLoginInstant: Scalars['Int'];
  lastName: Scalars['String'];
  lastUpdateInstant: Scalars['Int'];
  passwordChangeRequired?: Maybe<Scalars['Boolean']>;
  passwordLastUpdateInstant: Scalars['Int'];
  registrations?: Maybe<Array<Maybe<AuthRegistrations>>>;
  tenantId: Scalars['uuid'];
  usernameStatus: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type AuthUserData = {
  __typename?: 'AuthUserData';
  user?: Maybe<AuthUser>;
};

export type AuthUserMeta = {
  __typename?: 'AuthUserMeta';
  gender: Scalars['String'];
};

export type Bg_Raw_Scores = {
  __typename?: 'BG_Raw_Scores';
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  explanation?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  user_updated?: Maybe<Directus_Users>;
};


export type Bg_Raw_ScoresUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Bg_Raw_Scores_Aggregated = {
  __typename?: 'BG_Raw_Scores_aggregated';
  avg?: Maybe<Bg_Raw_Scores_Aggregated_Fields>;
  avgDistinct?: Maybe<Bg_Raw_Scores_Aggregated_Fields>;
  count?: Maybe<Bg_Raw_Scores_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Bg_Raw_Scores_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Bg_Raw_Scores_Aggregated_Fields>;
  min?: Maybe<Bg_Raw_Scores_Aggregated_Fields>;
  sum?: Maybe<Bg_Raw_Scores_Aggregated_Fields>;
  sumDistinct?: Maybe<Bg_Raw_Scores_Aggregated_Fields>;
};

export type Bg_Raw_Scores_Aggregated_Count = {
  __typename?: 'BG_Raw_Scores_aggregated_count';
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  explanation?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Bg_Raw_Scores_Aggregated_Fields = {
  __typename?: 'BG_Raw_Scores_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Bg_Raw_Scores_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Bg_Raw_Scores_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Bg_Raw_Scores_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  explanation?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Bg_Raw_Scores_Mutated = {
  __typename?: 'BG_Raw_Scores_mutated';
  data?: Maybe<Bg_Raw_Scores>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type Disclaimer_Acknowledgement = {
  __typename?: 'Disclaimer_Acknowledgement';
  Disclaimer?: Maybe<Disclaimers>;
  UserId?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
};


export type Disclaimer_AcknowledgementDisclaimerArgs = {
  filter?: InputMaybe<Disclaimers_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Disclaimer_Acknowledgement_Aggregated = {
  __typename?: 'Disclaimer_Acknowledgement_aggregated';
  avg?: Maybe<Disclaimer_Acknowledgement_Aggregated_Fields>;
  avgDistinct?: Maybe<Disclaimer_Acknowledgement_Aggregated_Fields>;
  count?: Maybe<Disclaimer_Acknowledgement_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Disclaimer_Acknowledgement_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Disclaimer_Acknowledgement_Aggregated_Fields>;
  min?: Maybe<Disclaimer_Acknowledgement_Aggregated_Fields>;
  sum?: Maybe<Disclaimer_Acknowledgement_Aggregated_Fields>;
  sumDistinct?: Maybe<Disclaimer_Acknowledgement_Aggregated_Fields>;
};

export type Disclaimer_Acknowledgement_Aggregated_Count = {
  __typename?: 'Disclaimer_Acknowledgement_aggregated_count';
  Disclaimer?: Maybe<Scalars['Int']>;
  UserId?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type Disclaimer_Acknowledgement_Aggregated_Fields = {
  __typename?: 'Disclaimer_Acknowledgement_aggregated_fields';
  Disclaimer?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type Disclaimer_Acknowledgement_Filter = {
  Disclaimer?: InputMaybe<Disclaimers_Filter>;
  UserId?: InputMaybe<String_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Disclaimer_Acknowledgement_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Disclaimer_Acknowledgement_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
};

export type Disclaimer_Acknowledgement_Mutated = {
  __typename?: 'Disclaimer_Acknowledgement_mutated';
  data?: Maybe<Disclaimer_Acknowledgement>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Disclaimers = {
  __typename?: 'Disclaimers';
  Disclaimer?: Maybe<Scalars['String']>;
  Title?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
};

export type Disclaimers_Aggregated = {
  __typename?: 'Disclaimers_aggregated';
  avg?: Maybe<Disclaimers_Aggregated_Fields>;
  avgDistinct?: Maybe<Disclaimers_Aggregated_Fields>;
  count?: Maybe<Disclaimers_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Disclaimers_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Disclaimers_Aggregated_Fields>;
  min?: Maybe<Disclaimers_Aggregated_Fields>;
  sum?: Maybe<Disclaimers_Aggregated_Fields>;
  sumDistinct?: Maybe<Disclaimers_Aggregated_Fields>;
};

export type Disclaimers_Aggregated_Count = {
  __typename?: 'Disclaimers_aggregated_count';
  Disclaimer?: Maybe<Scalars['Int']>;
  Title?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type Disclaimers_Aggregated_Fields = {
  __typename?: 'Disclaimers_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Disclaimers_Filter = {
  Disclaimer?: InputMaybe<String_Filter_Operators>;
  Title?: InputMaybe<String_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Disclaimers_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Disclaimers_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
};

export type Disclaimers_Mutated = {
  __typename?: 'Disclaimers_mutated';
  data?: Maybe<Disclaimers>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export enum EventEnum {
  Create = 'create',
  Delete = 'delete',
  Update = 'update'
}

export type Feature_Requests = {
  __typename?: 'Feature_Requests';
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type Feature_RequestsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Feature_RequestsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Feature_Requests_Aggregated = {
  __typename?: 'Feature_Requests_aggregated';
  avg?: Maybe<Feature_Requests_Aggregated_Fields>;
  avgDistinct?: Maybe<Feature_Requests_Aggregated_Fields>;
  count?: Maybe<Feature_Requests_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Feature_Requests_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Feature_Requests_Aggregated_Fields>;
  min?: Maybe<Feature_Requests_Aggregated_Fields>;
  sum?: Maybe<Feature_Requests_Aggregated_Fields>;
  sumDistinct?: Maybe<Feature_Requests_Aggregated_Fields>;
};

export type Feature_Requests_Aggregated_Count = {
  __typename?: 'Feature_Requests_aggregated_count';
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Feature_Requests_Aggregated_Fields = {
  __typename?: 'Feature_Requests_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Feature_Requests_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Feature_Requests_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Feature_Requests_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Feature_Requests_Mutated = {
  __typename?: 'Feature_Requests_mutated';
  data?: Maybe<Feature_Requests>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type FindUserResult = {
  __typename?: 'FindUserResult';
  total?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Gradient_Colour = {
  __typename?: 'Gradient_Colour';
  colour?: Maybe<Repeat_Colour>;
  id: Scalars['ID'];
  position?: Maybe<Scalars['Int']>;
};


export type Gradient_ColourColourArgs = {
  filter?: InputMaybe<Repeat_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Gradient_Colour_Aggregated = {
  __typename?: 'Gradient_Colour_aggregated';
  avg?: Maybe<Gradient_Colour_Aggregated_Fields>;
  avgDistinct?: Maybe<Gradient_Colour_Aggregated_Fields>;
  count?: Maybe<Gradient_Colour_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Gradient_Colour_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Gradient_Colour_Aggregated_Fields>;
  min?: Maybe<Gradient_Colour_Aggregated_Fields>;
  sum?: Maybe<Gradient_Colour_Aggregated_Fields>;
  sumDistinct?: Maybe<Gradient_Colour_Aggregated_Fields>;
};

export type Gradient_Colour_Aggregated_Count = {
  __typename?: 'Gradient_Colour_aggregated_count';
  colour?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
};

export type Gradient_Colour_Aggregated_Fields = {
  __typename?: 'Gradient_Colour_aggregated_fields';
  colour?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Gradient_Colour_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Gradient_Colour_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Gradient_Colour_Filter>>>;
  colour?: InputMaybe<Repeat_Colour_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  position?: InputMaybe<Number_Filter_Operators>;
};

export type Gradient_Colour_Mutated = {
  __typename?: 'Gradient_Colour_mutated';
  data?: Maybe<Gradient_Colour>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type PatchUserOutput = {
  __typename?: 'PatchUserOutput';
  user?: Maybe<PatchedUser>;
};

export type PatchedUser = {
  __typename?: 'PatchedUser';
  birthDate?: Maybe<Scalars['String']>;
  data?: Maybe<PatchedUserData>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type PatchedUserData = {
  __typename?: 'PatchedUserData';
  gender?: Maybe<Scalars['String']>;
};

export type Repeat_Colour = {
  __typename?: 'Repeat_Colour';
  color?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Repeat_Colour_Aggregated = {
  __typename?: 'Repeat_Colour_aggregated';
  avg?: Maybe<Repeat_Colour_Aggregated_Fields>;
  avgDistinct?: Maybe<Repeat_Colour_Aggregated_Fields>;
  count?: Maybe<Repeat_Colour_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Repeat_Colour_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Repeat_Colour_Aggregated_Fields>;
  min?: Maybe<Repeat_Colour_Aggregated_Fields>;
  sum?: Maybe<Repeat_Colour_Aggregated_Fields>;
  sumDistinct?: Maybe<Repeat_Colour_Aggregated_Fields>;
};

export type Repeat_Colour_Aggregated_Count = {
  __typename?: 'Repeat_Colour_aggregated_count';
  color?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
};

export type Repeat_Colour_Aggregated_Fields = {
  __typename?: 'Repeat_Colour_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Repeat_Colour_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Repeat_Colour_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Repeat_Colour_Filter>>>;
  color?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
};

export type Repeat_Colour_Mutated = {
  __typename?: 'Repeat_Colour_mutated';
  data?: Maybe<Repeat_Colour>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type SearchedUser = {
  __typename?: 'SearchedUser';
  active?: Maybe<Scalars['Boolean']>;
  birthDate?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Solution = {
  __typename?: 'Solution';
  category?: Maybe<Solution_Category>;
  content?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type SolutionCategoryArgs = {
  filter?: InputMaybe<Solution_Category_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type SolutionUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type SolutionUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Solution_Category = {
  __typename?: 'Solution_Category';
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type Solution_CategoryUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Solution_CategoryUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Solution_Category_Aggregated = {
  __typename?: 'Solution_Category_aggregated';
  avg?: Maybe<Solution_Category_Aggregated_Fields>;
  avgDistinct?: Maybe<Solution_Category_Aggregated_Fields>;
  count?: Maybe<Solution_Category_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Solution_Category_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Solution_Category_Aggregated_Fields>;
  min?: Maybe<Solution_Category_Aggregated_Fields>;
  sum?: Maybe<Solution_Category_Aggregated_Fields>;
  sumDistinct?: Maybe<Solution_Category_Aggregated_Fields>;
};

export type Solution_Category_Aggregated_Count = {
  __typename?: 'Solution_Category_aggregated_count';
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Solution_Category_Aggregated_Fields = {
  __typename?: 'Solution_Category_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Solution_Category_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Solution_Category_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Solution_Category_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Solution_Category_Mutated = {
  __typename?: 'Solution_Category_mutated';
  data?: Maybe<Solution_Category>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Solution_Aggregated = {
  __typename?: 'Solution_aggregated';
  avg?: Maybe<Solution_Aggregated_Fields>;
  avgDistinct?: Maybe<Solution_Aggregated_Fields>;
  count?: Maybe<Solution_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Solution_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Solution_Aggregated_Fields>;
  min?: Maybe<Solution_Aggregated_Fields>;
  sum?: Maybe<Solution_Aggregated_Fields>;
  sumDistinct?: Maybe<Solution_Aggregated_Fields>;
};

export type Solution_Aggregated_Count = {
  __typename?: 'Solution_aggregated_count';
  category?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  tags?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Solution_Aggregated_Fields = {
  __typename?: 'Solution_aggregated_fields';
  category?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Solution_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Solution_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Solution_Filter>>>;
  category?: InputMaybe<Solution_Category_Filter>;
  content?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Solution_Mutated = {
  __typename?: 'Solution_mutated';
  data?: Maybe<Solution>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  active?: Maybe<Scalars['Boolean']>;
  birthDate?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserDetails = {
  birthDate?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UserSearchedResults = {
  __typename?: 'UserSearchedResults';
  users?: Maybe<Array<Maybe<SearchedUser>>>;
};

/** columns and relationships of "adrenal_function_urine_test" */
export type Adrenal_Function_Urine_Test = {
  __typename?: 'adrenal_function_urine_test';
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  drops: Scalars['Int'];
  id: Scalars['uuid'];
  owner_id: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "adrenal_function_urine_test" */
export type Adrenal_Function_Urine_Test_Aggregate = {
  __typename?: 'adrenal_function_urine_test_aggregate';
  aggregate?: Maybe<Adrenal_Function_Urine_Test_Aggregate_Fields>;
  nodes: Array<Adrenal_Function_Urine_Test>;
};

/** aggregate fields of "adrenal_function_urine_test" */
export type Adrenal_Function_Urine_Test_Aggregate_Fields = {
  __typename?: 'adrenal_function_urine_test_aggregate_fields';
  avg?: Maybe<Adrenal_Function_Urine_Test_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Adrenal_Function_Urine_Test_Max_Fields>;
  min?: Maybe<Adrenal_Function_Urine_Test_Min_Fields>;
  stddev?: Maybe<Adrenal_Function_Urine_Test_Stddev_Fields>;
  stddev_pop?: Maybe<Adrenal_Function_Urine_Test_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Adrenal_Function_Urine_Test_Stddev_Samp_Fields>;
  sum?: Maybe<Adrenal_Function_Urine_Test_Sum_Fields>;
  var_pop?: Maybe<Adrenal_Function_Urine_Test_Var_Pop_Fields>;
  var_samp?: Maybe<Adrenal_Function_Urine_Test_Var_Samp_Fields>;
  variance?: Maybe<Adrenal_Function_Urine_Test_Variance_Fields>;
};


/** aggregate fields of "adrenal_function_urine_test" */
export type Adrenal_Function_Urine_Test_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Adrenal_Function_Urine_Test_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Adrenal_Function_Urine_Test_Avg_Fields = {
  __typename?: 'adrenal_function_urine_test_avg_fields';
  drops?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "adrenal_function_urine_test". All fields are combined with a logical 'AND'. */
export type Adrenal_Function_Urine_Test_Bool_Exp = {
  _and?: InputMaybe<Array<Adrenal_Function_Urine_Test_Bool_Exp>>;
  _not?: InputMaybe<Adrenal_Function_Urine_Test_Bool_Exp>;
  _or?: InputMaybe<Array<Adrenal_Function_Urine_Test_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  drops?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "adrenal_function_urine_test" */
export enum Adrenal_Function_Urine_Test_Constraint {
  /** unique or primary key constraint on columns "id" */
  AdrenalFunctionUrineTestPkey = 'adrenal_function_urine_test_pkey'
}

/** input type for incrementing numeric columns in table "adrenal_function_urine_test" */
export type Adrenal_Function_Urine_Test_Inc_Input = {
  drops?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "adrenal_function_urine_test" */
export type Adrenal_Function_Urine_Test_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  drops?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner_id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Adrenal_Function_Urine_Test_Max_Fields = {
  __typename?: 'adrenal_function_urine_test_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  drops?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  owner_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Adrenal_Function_Urine_Test_Min_Fields = {
  __typename?: 'adrenal_function_urine_test_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  drops?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  owner_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "adrenal_function_urine_test" */
export type Adrenal_Function_Urine_Test_Mutation_Response = {
  __typename?: 'adrenal_function_urine_test_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Adrenal_Function_Urine_Test>;
};

/** on_conflict condition type for table "adrenal_function_urine_test" */
export type Adrenal_Function_Urine_Test_On_Conflict = {
  constraint: Adrenal_Function_Urine_Test_Constraint;
  update_columns?: Array<Adrenal_Function_Urine_Test_Update_Column>;
  where?: InputMaybe<Adrenal_Function_Urine_Test_Bool_Exp>;
};

/** Ordering options when selecting data from "adrenal_function_urine_test". */
export type Adrenal_Function_Urine_Test_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  drops?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: adrenal_function_urine_test */
export type Adrenal_Function_Urine_Test_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "adrenal_function_urine_test" */
export enum Adrenal_Function_Urine_Test_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Drops = 'drops',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "adrenal_function_urine_test" */
export type Adrenal_Function_Urine_Test_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  drops?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner_id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Adrenal_Function_Urine_Test_Stddev_Fields = {
  __typename?: 'adrenal_function_urine_test_stddev_fields';
  drops?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Adrenal_Function_Urine_Test_Stddev_Pop_Fields = {
  __typename?: 'adrenal_function_urine_test_stddev_pop_fields';
  drops?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Adrenal_Function_Urine_Test_Stddev_Samp_Fields = {
  __typename?: 'adrenal_function_urine_test_stddev_samp_fields';
  drops?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "adrenal_function_urine_test" */
export type Adrenal_Function_Urine_Test_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Adrenal_Function_Urine_Test_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Adrenal_Function_Urine_Test_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  drops?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner_id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Adrenal_Function_Urine_Test_Sum_Fields = {
  __typename?: 'adrenal_function_urine_test_sum_fields';
  drops?: Maybe<Scalars['Int']>;
};

/** update columns of table "adrenal_function_urine_test" */
export enum Adrenal_Function_Urine_Test_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Drops = 'drops',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Adrenal_Function_Urine_Test_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Adrenal_Function_Urine_Test_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Adrenal_Function_Urine_Test_Set_Input>;
  /** filter the rows which have to be updated */
  where: Adrenal_Function_Urine_Test_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Adrenal_Function_Urine_Test_Var_Pop_Fields = {
  __typename?: 'adrenal_function_urine_test_var_pop_fields';
  drops?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Adrenal_Function_Urine_Test_Var_Samp_Fields = {
  __typename?: 'adrenal_function_urine_test_var_samp_fields';
  drops?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Adrenal_Function_Urine_Test_Variance_Fields = {
  __typename?: 'adrenal_function_urine_test_variance_fields';
  drops?: Maybe<Scalars['Float']>;
};

export type Answer = {
  __typename?: 'answer';
  answer_set?: Maybe<Answer_Set>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  option?: Maybe<Option>;
  question?: Maybe<Question>;
};


export type AnswerAnswer_SetArgs = {
  filter?: InputMaybe<Answer_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type AnswerOptionArgs = {
  filter?: InputMaybe<Option_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type AnswerQuestionArgs = {
  filter?: InputMaybe<Question_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Answer_Aggregated = {
  __typename?: 'answer_aggregated';
  avg?: Maybe<Answer_Aggregated_Fields>;
  avgDistinct?: Maybe<Answer_Aggregated_Fields>;
  count?: Maybe<Answer_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Answer_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Answer_Aggregated_Fields>;
  min?: Maybe<Answer_Aggregated_Fields>;
  sum?: Maybe<Answer_Aggregated_Fields>;
  sumDistinct?: Maybe<Answer_Aggregated_Fields>;
};

export type Answer_Aggregated_Count = {
  __typename?: 'answer_aggregated_count';
  answer_set?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  option?: Maybe<Scalars['Int']>;
  question?: Maybe<Scalars['Int']>;
};

export type Answer_Aggregated_Fields = {
  __typename?: 'answer_aggregated_fields';
  answer_set?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  option?: Maybe<Scalars['Float']>;
  question?: Maybe<Scalars['Float']>;
};

export type Answer_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Answer_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Answer_Filter>>>;
  answer_set?: InputMaybe<Answer_Set_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  option?: InputMaybe<Option_Filter>;
  question?: InputMaybe<Question_Filter>;
};

export type Answer_Group = {
  __typename?: 'answer_group';
  answer_sets?: Maybe<Array<Maybe<Answer_Set>>>;
  answer_sets_func?: Maybe<Count_Functions>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  owner_id?: Maybe<Scalars['String']>;
  questionnaire?: Maybe<Questionnaire>;
};


export type Answer_GroupAnswer_SetsArgs = {
  filter?: InputMaybe<Answer_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Answer_GroupQuestionnaireArgs = {
  filter?: InputMaybe<Questionnaire_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Answer_Group_Aggregated = {
  __typename?: 'answer_group_aggregated';
  avg?: Maybe<Answer_Group_Aggregated_Fields>;
  avgDistinct?: Maybe<Answer_Group_Aggregated_Fields>;
  count?: Maybe<Answer_Group_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Answer_Group_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Answer_Group_Aggregated_Fields>;
  min?: Maybe<Answer_Group_Aggregated_Fields>;
  sum?: Maybe<Answer_Group_Aggregated_Fields>;
  sumDistinct?: Maybe<Answer_Group_Aggregated_Fields>;
};

export type Answer_Group_Aggregated_Count = {
  __typename?: 'answer_group_aggregated_count';
  answer_sets?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  owner_id?: Maybe<Scalars['Int']>;
  questionnaire?: Maybe<Scalars['Int']>;
};

export type Answer_Group_Aggregated_Fields = {
  __typename?: 'answer_group_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  questionnaire?: Maybe<Scalars['Float']>;
};

export type Answer_Group_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Answer_Group_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Answer_Group_Filter>>>;
  answer_sets?: InputMaybe<Answer_Set_Filter>;
  answer_sets_func?: InputMaybe<Count_Function_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  owner_id?: InputMaybe<String_Filter_Operators>;
  questionnaire?: InputMaybe<Questionnaire_Filter>;
};

export type Answer_Group_Mutated = {
  __typename?: 'answer_group_mutated';
  data?: Maybe<Answer_Group>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Answer_Mutated = {
  __typename?: 'answer_mutated';
  data?: Maybe<Answer>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Answer_Set = {
  __typename?: 'answer_set';
  answer_group?: Maybe<Answer_Group>;
  answers?: Maybe<Array<Maybe<Answer>>>;
  answers_func?: Maybe<Count_Functions>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  owner_id?: Maybe<Scalars['String']>;
  question_set?: Maybe<Question_Set>;
};


export type Answer_SetAnswer_GroupArgs = {
  filter?: InputMaybe<Answer_Group_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Answer_SetAnswersArgs = {
  filter?: InputMaybe<Answer_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Answer_SetQuestion_SetArgs = {
  filter?: InputMaybe<Question_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Answer_Set_Aggregated = {
  __typename?: 'answer_set_aggregated';
  avg?: Maybe<Answer_Set_Aggregated_Fields>;
  avgDistinct?: Maybe<Answer_Set_Aggregated_Fields>;
  count?: Maybe<Answer_Set_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Answer_Set_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Answer_Set_Aggregated_Fields>;
  min?: Maybe<Answer_Set_Aggregated_Fields>;
  sum?: Maybe<Answer_Set_Aggregated_Fields>;
  sumDistinct?: Maybe<Answer_Set_Aggregated_Fields>;
};

export type Answer_Set_Aggregated_Count = {
  __typename?: 'answer_set_aggregated_count';
  answer_group?: Maybe<Scalars['Int']>;
  answers?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  owner_id?: Maybe<Scalars['Int']>;
  question_set?: Maybe<Scalars['Int']>;
};

export type Answer_Set_Aggregated_Fields = {
  __typename?: 'answer_set_aggregated_fields';
  answer_group?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  question_set?: Maybe<Scalars['Float']>;
};

export type Answer_Set_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Answer_Set_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Answer_Set_Filter>>>;
  answer_group?: InputMaybe<Answer_Group_Filter>;
  answers?: InputMaybe<Answer_Filter>;
  answers_func?: InputMaybe<Count_Function_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  owner_id?: InputMaybe<String_Filter_Operators>;
  question_set?: InputMaybe<Question_Set_Filter>;
};

export type Answer_Set_Mutated = {
  __typename?: 'answer_set_mutated';
  data?: Maybe<Answer_Set>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Bar_Gradients = {
  __typename?: 'bar_gradients';
  bar_name?: Maybe<Scalars['String']>;
  colours?: Maybe<Array<Maybe<Bar_Gradients_Gradient_Colour>>>;
  colours_func?: Maybe<Count_Functions>;
  id: Scalars['ID'];
};


export type Bar_GradientsColoursArgs = {
  filter?: InputMaybe<Bar_Gradients_Gradient_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Bar_Gradients_Gradient_Colour = {
  __typename?: 'bar_gradients_Gradient_Colour';
  Gradient_Colour_id?: Maybe<Gradient_Colour>;
  bar_gradients_id?: Maybe<Bar_Gradients>;
  id: Scalars['ID'];
};


export type Bar_Gradients_Gradient_ColourGradient_Colour_IdArgs = {
  filter?: InputMaybe<Gradient_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Bar_Gradients_Gradient_ColourBar_Gradients_IdArgs = {
  filter?: InputMaybe<Bar_Gradients_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Bar_Gradients_Gradient_Colour_Aggregated = {
  __typename?: 'bar_gradients_Gradient_Colour_aggregated';
  avg?: Maybe<Bar_Gradients_Gradient_Colour_Aggregated_Fields>;
  avgDistinct?: Maybe<Bar_Gradients_Gradient_Colour_Aggregated_Fields>;
  count?: Maybe<Bar_Gradients_Gradient_Colour_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Bar_Gradients_Gradient_Colour_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Bar_Gradients_Gradient_Colour_Aggregated_Fields>;
  min?: Maybe<Bar_Gradients_Gradient_Colour_Aggregated_Fields>;
  sum?: Maybe<Bar_Gradients_Gradient_Colour_Aggregated_Fields>;
  sumDistinct?: Maybe<Bar_Gradients_Gradient_Colour_Aggregated_Fields>;
};

export type Bar_Gradients_Gradient_Colour_Aggregated_Count = {
  __typename?: 'bar_gradients_Gradient_Colour_aggregated_count';
  Gradient_Colour_id?: Maybe<Scalars['Int']>;
  bar_gradients_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type Bar_Gradients_Gradient_Colour_Aggregated_Fields = {
  __typename?: 'bar_gradients_Gradient_Colour_aggregated_fields';
  Gradient_Colour_id?: Maybe<Scalars['Float']>;
  bar_gradients_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type Bar_Gradients_Gradient_Colour_Filter = {
  Gradient_Colour_id?: InputMaybe<Gradient_Colour_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Bar_Gradients_Gradient_Colour_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Bar_Gradients_Gradient_Colour_Filter>>>;
  bar_gradients_id?: InputMaybe<Bar_Gradients_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
};

export type Bar_Gradients_Gradient_Colour_Mutated = {
  __typename?: 'bar_gradients_Gradient_Colour_mutated';
  data?: Maybe<Bar_Gradients_Gradient_Colour>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Bar_Gradients_Aggregated = {
  __typename?: 'bar_gradients_aggregated';
  avg?: Maybe<Bar_Gradients_Aggregated_Fields>;
  avgDistinct?: Maybe<Bar_Gradients_Aggregated_Fields>;
  count?: Maybe<Bar_Gradients_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Bar_Gradients_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Bar_Gradients_Aggregated_Fields>;
  min?: Maybe<Bar_Gradients_Aggregated_Fields>;
  sum?: Maybe<Bar_Gradients_Aggregated_Fields>;
  sumDistinct?: Maybe<Bar_Gradients_Aggregated_Fields>;
};

export type Bar_Gradients_Aggregated_Count = {
  __typename?: 'bar_gradients_aggregated_count';
  bar_name?: Maybe<Scalars['Int']>;
  colours?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type Bar_Gradients_Aggregated_Fields = {
  __typename?: 'bar_gradients_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Bar_Gradients_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Bar_Gradients_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Bar_Gradients_Filter>>>;
  bar_name?: InputMaybe<String_Filter_Operators>;
  colours?: InputMaybe<Bar_Gradients_Gradient_Colour_Filter>;
  colours_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
};

export type Bar_Gradients_Mutated = {
  __typename?: 'bar_gradients_mutated';
  data?: Maybe<Bar_Gradients>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Bg_Parameters = {
  __typename?: 'bg_parameters';
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  explanation?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  user_updated?: Maybe<Directus_Users>;
};


export type Bg_ParametersUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Bg_Parameters_Aggregated = {
  __typename?: 'bg_parameters_aggregated';
  avg?: Maybe<Bg_Parameters_Aggregated_Fields>;
  avgDistinct?: Maybe<Bg_Parameters_Aggregated_Fields>;
  count?: Maybe<Bg_Parameters_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Bg_Parameters_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Bg_Parameters_Aggregated_Fields>;
  min?: Maybe<Bg_Parameters_Aggregated_Fields>;
  sum?: Maybe<Bg_Parameters_Aggregated_Fields>;
  sumDistinct?: Maybe<Bg_Parameters_Aggregated_Fields>;
};

export type Bg_Parameters_Aggregated_Count = {
  __typename?: 'bg_parameters_aggregated_count';
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  explanation?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Bg_Parameters_Aggregated_Fields = {
  __typename?: 'bg_parameters_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Bg_Parameters_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Bg_Parameters_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Bg_Parameters_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  explanation?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Bg_Parameters_Mutated = {
  __typename?: 'bg_parameters_mutated';
  data?: Maybe<Bg_Parameters>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Big_Int_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']>>>;
  _eq?: InputMaybe<Scalars['GraphQLBigInt']>;
  _gt?: InputMaybe<Scalars['GraphQLBigInt']>;
  _gte?: InputMaybe<Scalars['GraphQLBigInt']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']>>>;
  _lt?: InputMaybe<Scalars['GraphQLBigInt']>;
  _lte?: InputMaybe<Scalars['GraphQLBigInt']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']>>>;
  _neq?: InputMaybe<Scalars['GraphQLBigInt']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

export type Boolean_Filter_Operators = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to compare columns of type "bpchar". All fields are combined with logical 'AND'. */
export type Bpchar_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bpchar']>;
  _gt?: InputMaybe<Scalars['bpchar']>;
  _gte?: InputMaybe<Scalars['bpchar']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['bpchar']>;
  _in?: InputMaybe<Array<Scalars['bpchar']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['bpchar']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['bpchar']>;
  _lt?: InputMaybe<Scalars['bpchar']>;
  _lte?: InputMaybe<Scalars['bpchar']>;
  _neq?: InputMaybe<Scalars['bpchar']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['bpchar']>;
  _nin?: InputMaybe<Array<Scalars['bpchar']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['bpchar']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['bpchar']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['bpchar']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['bpchar']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['bpchar']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['bpchar']>;
};

/** columns and relationships of "brain_spectrum" */
export type Brain_Spectrum = {
  __typename?: 'brain_spectrum';
  alpha: Scalars['jsonb'];
  beta: Scalars['jsonb'];
  created_at: Scalars['timestamptz'];
  delta: Scalars['jsonb'];
  hbeta: Scalars['jsonb'];
  heart_data_id: Scalars['uuid'];
  id: Scalars['bigint'];
  owner_id: Scalars['String'];
  theta: Scalars['jsonb'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "brain_spectrum" */
export type Brain_SpectrumAlphaArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "brain_spectrum" */
export type Brain_SpectrumBetaArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "brain_spectrum" */
export type Brain_SpectrumDeltaArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "brain_spectrum" */
export type Brain_SpectrumHbetaArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "brain_spectrum" */
export type Brain_SpectrumThetaArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "brain_spectrum" */
export type Brain_Spectrum_Aggregate = {
  __typename?: 'brain_spectrum_aggregate';
  aggregate?: Maybe<Brain_Spectrum_Aggregate_Fields>;
  nodes: Array<Brain_Spectrum>;
};

/** aggregate fields of "brain_spectrum" */
export type Brain_Spectrum_Aggregate_Fields = {
  __typename?: 'brain_spectrum_aggregate_fields';
  avg?: Maybe<Brain_Spectrum_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Brain_Spectrum_Max_Fields>;
  min?: Maybe<Brain_Spectrum_Min_Fields>;
  stddev?: Maybe<Brain_Spectrum_Stddev_Fields>;
  stddev_pop?: Maybe<Brain_Spectrum_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Brain_Spectrum_Stddev_Samp_Fields>;
  sum?: Maybe<Brain_Spectrum_Sum_Fields>;
  var_pop?: Maybe<Brain_Spectrum_Var_Pop_Fields>;
  var_samp?: Maybe<Brain_Spectrum_Var_Samp_Fields>;
  variance?: Maybe<Brain_Spectrum_Variance_Fields>;
};


/** aggregate fields of "brain_spectrum" */
export type Brain_Spectrum_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Brain_Spectrum_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Brain_Spectrum_Append_Input = {
  alpha?: InputMaybe<Scalars['jsonb']>;
  beta?: InputMaybe<Scalars['jsonb']>;
  delta?: InputMaybe<Scalars['jsonb']>;
  hbeta?: InputMaybe<Scalars['jsonb']>;
  theta?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Brain_Spectrum_Avg_Fields = {
  __typename?: 'brain_spectrum_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "brain_spectrum". All fields are combined with a logical 'AND'. */
export type Brain_Spectrum_Bool_Exp = {
  _and?: InputMaybe<Array<Brain_Spectrum_Bool_Exp>>;
  _not?: InputMaybe<Brain_Spectrum_Bool_Exp>;
  _or?: InputMaybe<Array<Brain_Spectrum_Bool_Exp>>;
  alpha?: InputMaybe<Jsonb_Comparison_Exp>;
  beta?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  delta?: InputMaybe<Jsonb_Comparison_Exp>;
  hbeta?: InputMaybe<Jsonb_Comparison_Exp>;
  heart_data_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  theta?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "brain_spectrum" */
export enum Brain_Spectrum_Constraint {
  /** unique or primary key constraint on columns "heart_data_id" */
  BrainSpectrumHeartDataIdKey = 'brain_spectrum_heart_data_id_key',
  /** unique or primary key constraint on columns "id" */
  BrainSpectrumPkey = 'brain_spectrum_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Brain_Spectrum_Delete_At_Path_Input = {
  alpha?: InputMaybe<Array<Scalars['String']>>;
  beta?: InputMaybe<Array<Scalars['String']>>;
  delta?: InputMaybe<Array<Scalars['String']>>;
  hbeta?: InputMaybe<Array<Scalars['String']>>;
  theta?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Brain_Spectrum_Delete_Elem_Input = {
  alpha?: InputMaybe<Scalars['Int']>;
  beta?: InputMaybe<Scalars['Int']>;
  delta?: InputMaybe<Scalars['Int']>;
  hbeta?: InputMaybe<Scalars['Int']>;
  theta?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Brain_Spectrum_Delete_Key_Input = {
  alpha?: InputMaybe<Scalars['String']>;
  beta?: InputMaybe<Scalars['String']>;
  delta?: InputMaybe<Scalars['String']>;
  hbeta?: InputMaybe<Scalars['String']>;
  theta?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "brain_spectrum" */
export type Brain_Spectrum_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "brain_spectrum" */
export type Brain_Spectrum_Insert_Input = {
  alpha?: InputMaybe<Scalars['jsonb']>;
  beta?: InputMaybe<Scalars['jsonb']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  delta?: InputMaybe<Scalars['jsonb']>;
  hbeta?: InputMaybe<Scalars['jsonb']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  owner_id?: InputMaybe<Scalars['String']>;
  theta?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Brain_Spectrum_Max_Fields = {
  __typename?: 'brain_spectrum_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['bigint']>;
  owner_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Brain_Spectrum_Min_Fields = {
  __typename?: 'brain_spectrum_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['bigint']>;
  owner_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "brain_spectrum" */
export type Brain_Spectrum_Mutation_Response = {
  __typename?: 'brain_spectrum_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Brain_Spectrum>;
};

/** input type for inserting object relation for remote table "brain_spectrum" */
export type Brain_Spectrum_Obj_Rel_Insert_Input = {
  data: Brain_Spectrum_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Brain_Spectrum_On_Conflict>;
};

/** on_conflict condition type for table "brain_spectrum" */
export type Brain_Spectrum_On_Conflict = {
  constraint: Brain_Spectrum_Constraint;
  update_columns?: Array<Brain_Spectrum_Update_Column>;
  where?: InputMaybe<Brain_Spectrum_Bool_Exp>;
};

/** Ordering options when selecting data from "brain_spectrum". */
export type Brain_Spectrum_Order_By = {
  alpha?: InputMaybe<Order_By>;
  beta?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  hbeta?: InputMaybe<Order_By>;
  heart_data_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  theta?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: brain_spectrum */
export type Brain_Spectrum_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Brain_Spectrum_Prepend_Input = {
  alpha?: InputMaybe<Scalars['jsonb']>;
  beta?: InputMaybe<Scalars['jsonb']>;
  delta?: InputMaybe<Scalars['jsonb']>;
  hbeta?: InputMaybe<Scalars['jsonb']>;
  theta?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "brain_spectrum" */
export enum Brain_Spectrum_Select_Column {
  /** column name */
  Alpha = 'alpha',
  /** column name */
  Beta = 'beta',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Delta = 'delta',
  /** column name */
  Hbeta = 'hbeta',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Theta = 'theta',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "brain_spectrum" */
export type Brain_Spectrum_Set_Input = {
  alpha?: InputMaybe<Scalars['jsonb']>;
  beta?: InputMaybe<Scalars['jsonb']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  delta?: InputMaybe<Scalars['jsonb']>;
  hbeta?: InputMaybe<Scalars['jsonb']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  owner_id?: InputMaybe<Scalars['String']>;
  theta?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Brain_Spectrum_Stddev_Fields = {
  __typename?: 'brain_spectrum_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Brain_Spectrum_Stddev_Pop_Fields = {
  __typename?: 'brain_spectrum_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Brain_Spectrum_Stddev_Samp_Fields = {
  __typename?: 'brain_spectrum_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "brain_spectrum" */
export type Brain_Spectrum_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Brain_Spectrum_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Brain_Spectrum_Stream_Cursor_Value_Input = {
  alpha?: InputMaybe<Scalars['jsonb']>;
  beta?: InputMaybe<Scalars['jsonb']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  delta?: InputMaybe<Scalars['jsonb']>;
  hbeta?: InputMaybe<Scalars['jsonb']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  owner_id?: InputMaybe<Scalars['String']>;
  theta?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Brain_Spectrum_Sum_Fields = {
  __typename?: 'brain_spectrum_sum_fields';
  id?: Maybe<Scalars['bigint']>;
};

/** update columns of table "brain_spectrum" */
export enum Brain_Spectrum_Update_Column {
  /** column name */
  Alpha = 'alpha',
  /** column name */
  Beta = 'beta',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Delta = 'delta',
  /** column name */
  Hbeta = 'hbeta',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Theta = 'theta',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Brain_Spectrum_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Brain_Spectrum_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Brain_Spectrum_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Brain_Spectrum_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Brain_Spectrum_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Brain_Spectrum_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Brain_Spectrum_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Brain_Spectrum_Set_Input>;
  /** filter the rows which have to be updated */
  where: Brain_Spectrum_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Brain_Spectrum_Var_Pop_Fields = {
  __typename?: 'brain_spectrum_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Brain_Spectrum_Var_Samp_Fields = {
  __typename?: 'brain_spectrum_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Brain_Spectrum_Variance_Fields = {
  __typename?: 'brain_spectrum_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Count_Functions = {
  __typename?: 'count_functions';
  count?: Maybe<Scalars['Int']>;
};

export type Create_Bg_Raw_Scores_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  explanation?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Disclaimer_Acknowledgement_Input = {
  Disclaimer?: InputMaybe<Create_Disclaimers_Input>;
  UserId?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Create_Disclaimers_Input = {
  Disclaimer?: InputMaybe<Scalars['String']>;
  Title?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Create_Feature_Requests_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Gradient_Colour_Input = {
  colour?: InputMaybe<Create_Repeat_Colour_Input>;
  id?: InputMaybe<Scalars['ID']>;
  position?: InputMaybe<Scalars['Int']>;
};

export type Create_Repeat_Colour_Input = {
  color?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Create_Solution_Category_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Solution_Input = {
  category?: InputMaybe<Create_Solution_Category_Input>;
  content?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Answer_Group_Input = {
  answer_sets?: InputMaybe<Array<InputMaybe<Create_Answer_Set_Input>>>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  owner_id?: InputMaybe<Scalars['String']>;
  questionnaire?: InputMaybe<Create_Questionnaire_Input>;
};

export type Create_Answer_Input = {
  answer_set?: InputMaybe<Create_Answer_Set_Input>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  option?: InputMaybe<Create_Option_Input>;
  question?: InputMaybe<Create_Question_Input>;
};

export type Create_Answer_Set_Input = {
  answer_group?: InputMaybe<Create_Answer_Group_Input>;
  answers?: InputMaybe<Array<InputMaybe<Create_Answer_Input>>>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  owner_id?: InputMaybe<Scalars['String']>;
  question_set?: InputMaybe<Create_Question_Set_Input>;
};

export type Create_Bar_Gradients_Gradient_Colour_Input = {
  Gradient_Colour_id?: InputMaybe<Create_Gradient_Colour_Input>;
  bar_gradients_id?: InputMaybe<Create_Bar_Gradients_Input>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Create_Bar_Gradients_Input = {
  bar_name?: InputMaybe<Scalars['String']>;
  colours?: InputMaybe<Array<InputMaybe<Create_Bar_Gradients_Gradient_Colour_Input>>>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Create_Bg_Parameters_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  explanation?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Descriptions_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  hq_mobile?: InputMaybe<Scalars['String']>;
  hq_professional?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  key: Scalars['String'];
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Directus_Access_Input = {
  id?: InputMaybe<Scalars['ID']>;
  policy?: InputMaybe<Create_Directus_Policies_Input>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  sort?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Directus_Files_Input = {
  charset?: InputMaybe<Scalars['String']>;
  created_on?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  embed?: InputMaybe<Scalars['String']>;
  filename_disk?: InputMaybe<Scalars['String']>;
  filename_download: Scalars['String'];
  filesize?: InputMaybe<Scalars['GraphQLBigInt']>;
  focal_point_x?: InputMaybe<Scalars['Int']>;
  focal_point_y?: InputMaybe<Scalars['Int']>;
  folder?: InputMaybe<Create_Directus_Folders_Input>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  modified_by?: InputMaybe<Create_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars['Date']>;
  storage: Scalars['String'];
  tags?: InputMaybe<Scalars['JSON']>;
  title?: InputMaybe<Scalars['String']>;
  tus_data?: InputMaybe<Scalars['JSON']>;
  tus_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  uploaded_by?: InputMaybe<Create_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars['Date']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type Create_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  parent?: InputMaybe<Create_Directus_Folders_Input>;
};

export type Create_Directus_Permissions_Input = {
  action: Scalars['String'];
  collection: Scalars['String'];
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['ID']>;
  permissions?: InputMaybe<Scalars['JSON']>;
  policy?: InputMaybe<Create_Directus_Policies_Input>;
  presets?: InputMaybe<Scalars['JSON']>;
  validation?: InputMaybe<Scalars['JSON']>;
};

export type Create_Directus_Policies_Input = {
  admin_access: Scalars['Boolean'];
  app_access: Scalars['Boolean'];
  description?: InputMaybe<Scalars['String']>;
  /** $t:field_options.directus_policies.enforce_tfa */
  enforce_tfa: Scalars['Boolean'];
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name: Scalars['String'];
  permissions?: InputMaybe<Array<InputMaybe<Create_Directus_Permissions_Input>>>;
  roles?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
};

export type Create_Directus_Roles_Input = {
  children?: InputMaybe<Array<InputMaybe<Create_Directus_Roles_Input>>>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  parent?: InputMaybe<Create_Directus_Roles_Input>;
  policies?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Create_Directus_Users_Input>>>;
};

export type Create_Directus_Users_Input = {
  appearance?: InputMaybe<Scalars['String']>;
  auth_data?: InputMaybe<Scalars['JSON']>;
  avatar?: InputMaybe<Create_Directus_Files_Input>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email_notifications?: InputMaybe<Scalars['Boolean']>;
  external_identifier?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  language?: InputMaybe<Scalars['String']>;
  last_access?: InputMaybe<Scalars['Date']>;
  last_name?: InputMaybe<Scalars['String']>;
  last_page?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['Hash']>;
  policies?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
  provider?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  status?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  tfa_secret?: InputMaybe<Scalars['Hash']>;
  theme_dark?: InputMaybe<Scalars['String']>;
  theme_dark_overrides?: InputMaybe<Scalars['JSON']>;
  theme_light?: InputMaybe<Scalars['String']>;
  theme_light_overrides?: InputMaybe<Scalars['JSON']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['Hash']>;
};

export type Create_Explanation_Input = {
  Ref_Key?: InputMaybe<Create_Values_Input>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  explanation?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  show_title?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Global_Notifications_Input = {
  Title?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  message?: InputMaybe<Scalars['String']>;
  message_type?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Match_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  explanation?: InputMaybe<Create_Explanation_Input>;
  gender?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  max?: InputMaybe<Scalars['Float']>;
  max_age?: InputMaybe<Scalars['Float']>;
  min?: InputMaybe<Scalars['Float']>;
  min_age?: InputMaybe<Scalars['Float']>;
  refKey?: InputMaybe<Create_Values_Input>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Option_Group_Input = {
  details?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  options?: InputMaybe<Array<InputMaybe<Create_Option_Input>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type Create_Option_Input = {
  id?: InputMaybe<Scalars['ID']>;
  option_group?: InputMaybe<Create_Option_Group_Input>;
  sort?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Int']>;
};

export type Create_Question_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  instructions?: InputMaybe<Scalars['String']>;
  option_group?: InputMaybe<Create_Option_Group_Input>;
  question?: InputMaybe<Scalars['String']>;
  question_set?: InputMaybe<Create_Question_Set_Input>;
  sort?: InputMaybe<Scalars['Int']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Question_Set_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  instructions?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  questionnaires?: InputMaybe<Array<InputMaybe<Create_Questionnaire_Question_Set_Input>>>;
  questions?: InputMaybe<Array<InputMaybe<Create_Question_Input>>>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Create_Questionnaire_Conclusion_Input = {
  content?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  questionnaire?: InputMaybe<Create_Questionnaire_Input>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Questionnaire_Input = {
  answer_group?: InputMaybe<Array<InputMaybe<Create_Answer_Group_Input>>>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  instructions?: InputMaybe<Scalars['String']>;
  question_sets?: InputMaybe<Array<InputMaybe<Create_Questionnaire_Question_Set_Input>>>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Questionnaire_Question_Set_Input = {
  id?: InputMaybe<Scalars['ID']>;
  optional?: InputMaybe<Scalars['Boolean']>;
  question_set_id?: InputMaybe<Create_Question_Set_Input>;
  questionnaire_id?: InputMaybe<Create_Questionnaire_Input>;
};

export type Create_Tutorials_Input = {
  body?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Values_Input = {
  abs_max?: InputMaybe<Scalars['Float']>;
  abs_min?: InputMaybe<Scalars['Float']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  grouping?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  ideal_max?: InputMaybe<Scalars['Float']>;
  ideal_min?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_alt?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type Date_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Datetime_Function_Filter_Operators = {
  day?: InputMaybe<Number_Filter_Operators>;
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
  year?: InputMaybe<Number_Filter_Operators>;
};

export type Datetime_Functions = {
  __typename?: 'datetime_functions';
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  week?: Maybe<Scalars['Int']>;
  weekday?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Delete_Many = {
  __typename?: 'delete_many';
  ids: Array<Maybe<Scalars['ID']>>;
};

export type Delete_One = {
  __typename?: 'delete_one';
  id: Scalars['ID'];
};

export type Descriptions = {
  __typename?: 'descriptions';
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  hq_mobile?: Maybe<Scalars['String']>;
  hq_professional?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  key: Scalars['String'];
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type DescriptionsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type DescriptionsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Descriptions_Aggregated = {
  __typename?: 'descriptions_aggregated';
  avg?: Maybe<Descriptions_Aggregated_Fields>;
  avgDistinct?: Maybe<Descriptions_Aggregated_Fields>;
  count?: Maybe<Descriptions_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Descriptions_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Descriptions_Aggregated_Fields>;
  min?: Maybe<Descriptions_Aggregated_Fields>;
  sum?: Maybe<Descriptions_Aggregated_Fields>;
  sumDistinct?: Maybe<Descriptions_Aggregated_Fields>;
};

export type Descriptions_Aggregated_Count = {
  __typename?: 'descriptions_aggregated_count';
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  hq_mobile?: Maybe<Scalars['Int']>;
  hq_professional?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Descriptions_Aggregated_Fields = {
  __typename?: 'descriptions_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Descriptions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Descriptions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Descriptions_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  hq_mobile?: InputMaybe<String_Filter_Operators>;
  hq_professional?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Descriptions_Mutated = {
  __typename?: 'descriptions_mutated';
  data?: Maybe<Descriptions>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

/** columns and relationships of "device" */
export type Device = {
  __typename?: 'device';
  /** An object relationship */
  device_assignment?: Maybe<Device_Assignment>;
  /** An array relationship */
  device_locations: Array<Device_Location>;
  /** An aggregate relationship */
  device_locations_aggregate: Device_Location_Aggregate;
  device_serial?: Maybe<Scalars['String']>;
  device_type?: Maybe<Scalars['String']>;
  /** An array relationship */
  device_usages: Array<Device_Usage>;
  /** An aggregate relationship */
  device_usages_aggregate: Device_Usage_Aggregate;
  hardware_version?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  pcb_serial?: Maybe<Scalars['String']>;
  software_version?: Maybe<Scalars['String']>;
};


/** columns and relationships of "device" */
export type DeviceDevice_LocationsArgs = {
  distinct_on?: InputMaybe<Array<Device_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Location_Order_By>>;
  where?: InputMaybe<Device_Location_Bool_Exp>;
};


/** columns and relationships of "device" */
export type DeviceDevice_Locations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Device_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Location_Order_By>>;
  where?: InputMaybe<Device_Location_Bool_Exp>;
};


/** columns and relationships of "device" */
export type DeviceDevice_UsagesArgs = {
  distinct_on?: InputMaybe<Array<Device_Usage_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Usage_Order_By>>;
  where?: InputMaybe<Device_Usage_Bool_Exp>;
};


/** columns and relationships of "device" */
export type DeviceDevice_Usages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Device_Usage_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Usage_Order_By>>;
  where?: InputMaybe<Device_Usage_Bool_Exp>;
};

/** aggregated selection of "device" */
export type Device_Aggregate = {
  __typename?: 'device_aggregate';
  aggregate?: Maybe<Device_Aggregate_Fields>;
  nodes: Array<Device>;
};

/** aggregate fields of "device" */
export type Device_Aggregate_Fields = {
  __typename?: 'device_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Device_Max_Fields>;
  min?: Maybe<Device_Min_Fields>;
};


/** aggregate fields of "device" */
export type Device_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Device_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** columns and relationships of "device_assignment" */
export type Device_Assignment = {
  __typename?: 'device_assignment';
  assigned_at: Scalars['timestamptz'];
  /** An object relationship */
  device: Device;
  device_id: Scalars['uuid'];
  id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['uuid'];
};

/** aggregated selection of "device_assignment" */
export type Device_Assignment_Aggregate = {
  __typename?: 'device_assignment_aggregate';
  aggregate?: Maybe<Device_Assignment_Aggregate_Fields>;
  nodes: Array<Device_Assignment>;
};

/** aggregate fields of "device_assignment" */
export type Device_Assignment_Aggregate_Fields = {
  __typename?: 'device_assignment_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Device_Assignment_Max_Fields>;
  min?: Maybe<Device_Assignment_Min_Fields>;
};


/** aggregate fields of "device_assignment" */
export type Device_Assignment_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Device_Assignment_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "device_assignment". All fields are combined with a logical 'AND'. */
export type Device_Assignment_Bool_Exp = {
  _and?: InputMaybe<Array<Device_Assignment_Bool_Exp>>;
  _not?: InputMaybe<Device_Assignment_Bool_Exp>;
  _or?: InputMaybe<Array<Device_Assignment_Bool_Exp>>;
  assigned_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  device?: InputMaybe<Device_Bool_Exp>;
  device_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "device_assignment" */
export enum Device_Assignment_Constraint {
  /** unique or primary key constraint on columns "device_id" */
  DeviceAssignmentDeviceIdKey = 'device_assignment_device_id_key',
  /** unique or primary key constraint on columns "id" */
  DeviceAssignmentPkey = 'device_assignment_pkey',
  /** unique or primary key constraint on columns "user_id" */
  DeviceAssignmentUserIdKey = 'device_assignment_user_id_key'
}

/** input type for inserting data into table "device_assignment" */
export type Device_Assignment_Insert_Input = {
  assigned_at?: InputMaybe<Scalars['timestamptz']>;
  device?: InputMaybe<Device_Obj_Rel_Insert_Input>;
  device_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Device_Assignment_Max_Fields = {
  __typename?: 'device_assignment_max_fields';
  assigned_at?: Maybe<Scalars['timestamptz']>;
  device_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Device_Assignment_Min_Fields = {
  __typename?: 'device_assignment_min_fields';
  assigned_at?: Maybe<Scalars['timestamptz']>;
  device_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "device_assignment" */
export type Device_Assignment_Mutation_Response = {
  __typename?: 'device_assignment_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Device_Assignment>;
};

/** input type for inserting object relation for remote table "device_assignment" */
export type Device_Assignment_Obj_Rel_Insert_Input = {
  data: Device_Assignment_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Device_Assignment_On_Conflict>;
};

/** on_conflict condition type for table "device_assignment" */
export type Device_Assignment_On_Conflict = {
  constraint: Device_Assignment_Constraint;
  update_columns?: Array<Device_Assignment_Update_Column>;
  where?: InputMaybe<Device_Assignment_Bool_Exp>;
};

/** Ordering options when selecting data from "device_assignment". */
export type Device_Assignment_Order_By = {
  assigned_at?: InputMaybe<Order_By>;
  device?: InputMaybe<Device_Order_By>;
  device_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: device_assignment */
export type Device_Assignment_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "device_assignment" */
export enum Device_Assignment_Select_Column {
  /** column name */
  AssignedAt = 'assigned_at',
  /** column name */
  DeviceId = 'device_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "device_assignment" */
export type Device_Assignment_Set_Input = {
  assigned_at?: InputMaybe<Scalars['timestamptz']>;
  device_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "device_assignment" */
export type Device_Assignment_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Device_Assignment_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Device_Assignment_Stream_Cursor_Value_Input = {
  assigned_at?: InputMaybe<Scalars['timestamptz']>;
  device_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "device_assignment" */
export enum Device_Assignment_Update_Column {
  /** column name */
  AssignedAt = 'assigned_at',
  /** column name */
  DeviceId = 'device_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Device_Assignment_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Device_Assignment_Set_Input>;
  /** filter the rows which have to be updated */
  where: Device_Assignment_Bool_Exp;
};

/** Boolean expression to filter rows from the table "device". All fields are combined with a logical 'AND'. */
export type Device_Bool_Exp = {
  _and?: InputMaybe<Array<Device_Bool_Exp>>;
  _not?: InputMaybe<Device_Bool_Exp>;
  _or?: InputMaybe<Array<Device_Bool_Exp>>;
  device_assignment?: InputMaybe<Device_Assignment_Bool_Exp>;
  device_locations?: InputMaybe<Device_Location_Bool_Exp>;
  device_locations_aggregate?: InputMaybe<Device_Location_Aggregate_Bool_Exp>;
  device_serial?: InputMaybe<String_Comparison_Exp>;
  device_type?: InputMaybe<String_Comparison_Exp>;
  device_usages?: InputMaybe<Device_Usage_Bool_Exp>;
  device_usages_aggregate?: InputMaybe<Device_Usage_Aggregate_Bool_Exp>;
  hardware_version?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  pcb_serial?: InputMaybe<String_Comparison_Exp>;
  software_version?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "device" */
export enum Device_Constraint {
  /** unique or primary key constraint on columns "id" */
  DevicePkey = 'device_pkey'
}

/** input type for inserting data into table "device" */
export type Device_Insert_Input = {
  device_assignment?: InputMaybe<Device_Assignment_Obj_Rel_Insert_Input>;
  device_locations?: InputMaybe<Device_Location_Arr_Rel_Insert_Input>;
  device_serial?: InputMaybe<Scalars['String']>;
  device_type?: InputMaybe<Scalars['String']>;
  device_usages?: InputMaybe<Device_Usage_Arr_Rel_Insert_Input>;
  hardware_version?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  pcb_serial?: InputMaybe<Scalars['String']>;
  software_version?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "device_location" */
export type Device_Location = {
  __typename?: 'device_location';
  accuracy?: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  device?: Maybe<Device>;
  device_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  device_usage: Device_Usage;
  device_usage_id: Scalars['bigint'];
  id: Scalars['bigint'];
  latitude: Scalars['numeric'];
  longitude: Scalars['numeric'];
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['uuid'];
};

/** aggregated selection of "device_location" */
export type Device_Location_Aggregate = {
  __typename?: 'device_location_aggregate';
  aggregate?: Maybe<Device_Location_Aggregate_Fields>;
  nodes: Array<Device_Location>;
};

export type Device_Location_Aggregate_Bool_Exp = {
  count?: InputMaybe<Device_Location_Aggregate_Bool_Exp_Count>;
};

export type Device_Location_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Device_Location_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Device_Location_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "device_location" */
export type Device_Location_Aggregate_Fields = {
  __typename?: 'device_location_aggregate_fields';
  avg?: Maybe<Device_Location_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Device_Location_Max_Fields>;
  min?: Maybe<Device_Location_Min_Fields>;
  stddev?: Maybe<Device_Location_Stddev_Fields>;
  stddev_pop?: Maybe<Device_Location_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Device_Location_Stddev_Samp_Fields>;
  sum?: Maybe<Device_Location_Sum_Fields>;
  var_pop?: Maybe<Device_Location_Var_Pop_Fields>;
  var_samp?: Maybe<Device_Location_Var_Samp_Fields>;
  variance?: Maybe<Device_Location_Variance_Fields>;
};


/** aggregate fields of "device_location" */
export type Device_Location_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Device_Location_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "device_location" */
export type Device_Location_Aggregate_Order_By = {
  avg?: InputMaybe<Device_Location_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Device_Location_Max_Order_By>;
  min?: InputMaybe<Device_Location_Min_Order_By>;
  stddev?: InputMaybe<Device_Location_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Device_Location_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Device_Location_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Device_Location_Sum_Order_By>;
  var_pop?: InputMaybe<Device_Location_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Device_Location_Var_Samp_Order_By>;
  variance?: InputMaybe<Device_Location_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "device_location" */
export type Device_Location_Arr_Rel_Insert_Input = {
  data: Array<Device_Location_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Device_Location_On_Conflict>;
};

/** aggregate avg on columns */
export type Device_Location_Avg_Fields = {
  __typename?: 'device_location_avg_fields';
  accuracy?: Maybe<Scalars['Float']>;
  device_usage_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "device_location" */
export type Device_Location_Avg_Order_By = {
  accuracy?: InputMaybe<Order_By>;
  device_usage_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "device_location". All fields are combined with a logical 'AND'. */
export type Device_Location_Bool_Exp = {
  _and?: InputMaybe<Array<Device_Location_Bool_Exp>>;
  _not?: InputMaybe<Device_Location_Bool_Exp>;
  _or?: InputMaybe<Array<Device_Location_Bool_Exp>>;
  accuracy?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  device?: InputMaybe<Device_Bool_Exp>;
  device_id?: InputMaybe<Uuid_Comparison_Exp>;
  device_usage?: InputMaybe<Device_Usage_Bool_Exp>;
  device_usage_id?: InputMaybe<Bigint_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  latitude?: InputMaybe<Numeric_Comparison_Exp>;
  longitude?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "device_location" */
export enum Device_Location_Constraint {
  /** unique or primary key constraint on columns "id" */
  DeviceLocationPkey = 'device_location_pkey'
}

/** input type for incrementing numeric columns in table "device_location" */
export type Device_Location_Inc_Input = {
  accuracy?: InputMaybe<Scalars['Int']>;
  device_usage_id?: InputMaybe<Scalars['bigint']>;
  id?: InputMaybe<Scalars['bigint']>;
  latitude?: InputMaybe<Scalars['numeric']>;
  longitude?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "device_location" */
export type Device_Location_Insert_Input = {
  accuracy?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  device?: InputMaybe<Device_Obj_Rel_Insert_Input>;
  device_id?: InputMaybe<Scalars['uuid']>;
  device_usage?: InputMaybe<Device_Usage_Obj_Rel_Insert_Input>;
  device_usage_id?: InputMaybe<Scalars['bigint']>;
  id?: InputMaybe<Scalars['bigint']>;
  latitude?: InputMaybe<Scalars['numeric']>;
  longitude?: InputMaybe<Scalars['numeric']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Device_Location_Max_Fields = {
  __typename?: 'device_location_max_fields';
  accuracy?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  device_id?: Maybe<Scalars['uuid']>;
  device_usage_id?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['bigint']>;
  latitude?: Maybe<Scalars['numeric']>;
  longitude?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "device_location" */
export type Device_Location_Max_Order_By = {
  accuracy?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  device_id?: InputMaybe<Order_By>;
  device_usage_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Device_Location_Min_Fields = {
  __typename?: 'device_location_min_fields';
  accuracy?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  device_id?: Maybe<Scalars['uuid']>;
  device_usage_id?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['bigint']>;
  latitude?: Maybe<Scalars['numeric']>;
  longitude?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "device_location" */
export type Device_Location_Min_Order_By = {
  accuracy?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  device_id?: InputMaybe<Order_By>;
  device_usage_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "device_location" */
export type Device_Location_Mutation_Response = {
  __typename?: 'device_location_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Device_Location>;
};

/** on_conflict condition type for table "device_location" */
export type Device_Location_On_Conflict = {
  constraint: Device_Location_Constraint;
  update_columns?: Array<Device_Location_Update_Column>;
  where?: InputMaybe<Device_Location_Bool_Exp>;
};

/** Ordering options when selecting data from "device_location". */
export type Device_Location_Order_By = {
  accuracy?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  device?: InputMaybe<Device_Order_By>;
  device_id?: InputMaybe<Order_By>;
  device_usage?: InputMaybe<Device_Usage_Order_By>;
  device_usage_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: device_location */
export type Device_Location_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "device_location" */
export enum Device_Location_Select_Column {
  /** column name */
  Accuracy = 'accuracy',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeviceId = 'device_id',
  /** column name */
  DeviceUsageId = 'device_usage_id',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "device_location" */
export type Device_Location_Set_Input = {
  accuracy?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  device_id?: InputMaybe<Scalars['uuid']>;
  device_usage_id?: InputMaybe<Scalars['bigint']>;
  id?: InputMaybe<Scalars['bigint']>;
  latitude?: InputMaybe<Scalars['numeric']>;
  longitude?: InputMaybe<Scalars['numeric']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Device_Location_Stddev_Fields = {
  __typename?: 'device_location_stddev_fields';
  accuracy?: Maybe<Scalars['Float']>;
  device_usage_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "device_location" */
export type Device_Location_Stddev_Order_By = {
  accuracy?: InputMaybe<Order_By>;
  device_usage_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Device_Location_Stddev_Pop_Fields = {
  __typename?: 'device_location_stddev_pop_fields';
  accuracy?: Maybe<Scalars['Float']>;
  device_usage_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "device_location" */
export type Device_Location_Stddev_Pop_Order_By = {
  accuracy?: InputMaybe<Order_By>;
  device_usage_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Device_Location_Stddev_Samp_Fields = {
  __typename?: 'device_location_stddev_samp_fields';
  accuracy?: Maybe<Scalars['Float']>;
  device_usage_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "device_location" */
export type Device_Location_Stddev_Samp_Order_By = {
  accuracy?: InputMaybe<Order_By>;
  device_usage_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "device_location" */
export type Device_Location_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Device_Location_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Device_Location_Stream_Cursor_Value_Input = {
  accuracy?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  device_id?: InputMaybe<Scalars['uuid']>;
  device_usage_id?: InputMaybe<Scalars['bigint']>;
  id?: InputMaybe<Scalars['bigint']>;
  latitude?: InputMaybe<Scalars['numeric']>;
  longitude?: InputMaybe<Scalars['numeric']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate sum on columns */
export type Device_Location_Sum_Fields = {
  __typename?: 'device_location_sum_fields';
  accuracy?: Maybe<Scalars['Int']>;
  device_usage_id?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['bigint']>;
  latitude?: Maybe<Scalars['numeric']>;
  longitude?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "device_location" */
export type Device_Location_Sum_Order_By = {
  accuracy?: InputMaybe<Order_By>;
  device_usage_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
};

/** update columns of table "device_location" */
export enum Device_Location_Update_Column {
  /** column name */
  Accuracy = 'accuracy',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeviceId = 'device_id',
  /** column name */
  DeviceUsageId = 'device_usage_id',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Device_Location_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Device_Location_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Device_Location_Set_Input>;
  /** filter the rows which have to be updated */
  where: Device_Location_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Device_Location_Var_Pop_Fields = {
  __typename?: 'device_location_var_pop_fields';
  accuracy?: Maybe<Scalars['Float']>;
  device_usage_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "device_location" */
export type Device_Location_Var_Pop_Order_By = {
  accuracy?: InputMaybe<Order_By>;
  device_usage_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Device_Location_Var_Samp_Fields = {
  __typename?: 'device_location_var_samp_fields';
  accuracy?: Maybe<Scalars['Float']>;
  device_usage_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "device_location" */
export type Device_Location_Var_Samp_Order_By = {
  accuracy?: InputMaybe<Order_By>;
  device_usage_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Device_Location_Variance_Fields = {
  __typename?: 'device_location_variance_fields';
  accuracy?: Maybe<Scalars['Float']>;
  device_usage_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "device_location" */
export type Device_Location_Variance_Order_By = {
  accuracy?: InputMaybe<Order_By>;
  device_usage_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
};

/** aggregate max on columns */
export type Device_Max_Fields = {
  __typename?: 'device_max_fields';
  device_serial?: Maybe<Scalars['String']>;
  device_type?: Maybe<Scalars['String']>;
  hardware_version?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  pcb_serial?: Maybe<Scalars['String']>;
  software_version?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Device_Min_Fields = {
  __typename?: 'device_min_fields';
  device_serial?: Maybe<Scalars['String']>;
  device_type?: Maybe<Scalars['String']>;
  hardware_version?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  pcb_serial?: Maybe<Scalars['String']>;
  software_version?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "device" */
export type Device_Mutation_Response = {
  __typename?: 'device_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Device>;
};

/** input type for inserting object relation for remote table "device" */
export type Device_Obj_Rel_Insert_Input = {
  data: Device_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Device_On_Conflict>;
};

/** on_conflict condition type for table "device" */
export type Device_On_Conflict = {
  constraint: Device_Constraint;
  update_columns?: Array<Device_Update_Column>;
  where?: InputMaybe<Device_Bool_Exp>;
};

/** Ordering options when selecting data from "device". */
export type Device_Order_By = {
  device_assignment?: InputMaybe<Device_Assignment_Order_By>;
  device_locations_aggregate?: InputMaybe<Device_Location_Aggregate_Order_By>;
  device_serial?: InputMaybe<Order_By>;
  device_type?: InputMaybe<Order_By>;
  device_usages_aggregate?: InputMaybe<Device_Usage_Aggregate_Order_By>;
  hardware_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pcb_serial?: InputMaybe<Order_By>;
  software_version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: device */
export type Device_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "device" */
export enum Device_Select_Column {
  /** column name */
  DeviceSerial = 'device_serial',
  /** column name */
  DeviceType = 'device_type',
  /** column name */
  HardwareVersion = 'hardware_version',
  /** column name */
  Id = 'id',
  /** column name */
  PcbSerial = 'pcb_serial',
  /** column name */
  SoftwareVersion = 'software_version'
}

/** input type for updating data in table "device" */
export type Device_Set_Input = {
  device_serial?: InputMaybe<Scalars['String']>;
  device_type?: InputMaybe<Scalars['String']>;
  hardware_version?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  pcb_serial?: InputMaybe<Scalars['String']>;
  software_version?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "device" */
export type Device_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Device_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Device_Stream_Cursor_Value_Input = {
  device_serial?: InputMaybe<Scalars['String']>;
  device_type?: InputMaybe<Scalars['String']>;
  hardware_version?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  pcb_serial?: InputMaybe<Scalars['String']>;
  software_version?: InputMaybe<Scalars['String']>;
};

/** update columns of table "device" */
export enum Device_Update_Column {
  /** column name */
  DeviceSerial = 'device_serial',
  /** column name */
  DeviceType = 'device_type',
  /** column name */
  HardwareVersion = 'hardware_version',
  /** column name */
  Id = 'id',
  /** column name */
  PcbSerial = 'pcb_serial',
  /** column name */
  SoftwareVersion = 'software_version'
}

export type Device_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Device_Set_Input>;
  /** filter the rows which have to be updated */
  where: Device_Bool_Exp;
};

/** columns and relationships of "device_usage" */
export type Device_Usage = {
  __typename?: 'device_usage';
  battery_level?: Maybe<Scalars['smallint']>;
  client_name?: Maybe<Scalars['String']>;
  client_type?: Maybe<Scalars['String']>;
  /** An object relationship */
  device: Device;
  device_id: Scalars['uuid'];
  /** An array relationship */
  device_locations: Array<Device_Location>;
  /** An aggregate relationship */
  device_locations_aggregate: Device_Location_Aggregate;
  id: Scalars['bigint'];
  ip_address?: Maybe<Scalars['inet']>;
  platform_name?: Maybe<Scalars['String']>;
  platform_version?: Maybe<Scalars['String']>;
  used_at: Scalars['timestamptz'];
  used_by_id: Scalars['uuid'];
  used_on_id: Scalars['uuid'];
};


/** columns and relationships of "device_usage" */
export type Device_UsageDevice_LocationsArgs = {
  distinct_on?: InputMaybe<Array<Device_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Location_Order_By>>;
  where?: InputMaybe<Device_Location_Bool_Exp>;
};


/** columns and relationships of "device_usage" */
export type Device_UsageDevice_Locations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Device_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Location_Order_By>>;
  where?: InputMaybe<Device_Location_Bool_Exp>;
};

/** aggregated selection of "device_usage" */
export type Device_Usage_Aggregate = {
  __typename?: 'device_usage_aggregate';
  aggregate?: Maybe<Device_Usage_Aggregate_Fields>;
  nodes: Array<Device_Usage>;
};

export type Device_Usage_Aggregate_Bool_Exp = {
  count?: InputMaybe<Device_Usage_Aggregate_Bool_Exp_Count>;
};

export type Device_Usage_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Device_Usage_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Device_Usage_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "device_usage" */
export type Device_Usage_Aggregate_Fields = {
  __typename?: 'device_usage_aggregate_fields';
  avg?: Maybe<Device_Usage_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Device_Usage_Max_Fields>;
  min?: Maybe<Device_Usage_Min_Fields>;
  stddev?: Maybe<Device_Usage_Stddev_Fields>;
  stddev_pop?: Maybe<Device_Usage_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Device_Usage_Stddev_Samp_Fields>;
  sum?: Maybe<Device_Usage_Sum_Fields>;
  var_pop?: Maybe<Device_Usage_Var_Pop_Fields>;
  var_samp?: Maybe<Device_Usage_Var_Samp_Fields>;
  variance?: Maybe<Device_Usage_Variance_Fields>;
};


/** aggregate fields of "device_usage" */
export type Device_Usage_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Device_Usage_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "device_usage" */
export type Device_Usage_Aggregate_Order_By = {
  avg?: InputMaybe<Device_Usage_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Device_Usage_Max_Order_By>;
  min?: InputMaybe<Device_Usage_Min_Order_By>;
  stddev?: InputMaybe<Device_Usage_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Device_Usage_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Device_Usage_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Device_Usage_Sum_Order_By>;
  var_pop?: InputMaybe<Device_Usage_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Device_Usage_Var_Samp_Order_By>;
  variance?: InputMaybe<Device_Usage_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "device_usage" */
export type Device_Usage_Arr_Rel_Insert_Input = {
  data: Array<Device_Usage_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Device_Usage_On_Conflict>;
};

/** aggregate avg on columns */
export type Device_Usage_Avg_Fields = {
  __typename?: 'device_usage_avg_fields';
  battery_level?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "device_usage" */
export type Device_Usage_Avg_Order_By = {
  battery_level?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "device_usage". All fields are combined with a logical 'AND'. */
export type Device_Usage_Bool_Exp = {
  _and?: InputMaybe<Array<Device_Usage_Bool_Exp>>;
  _not?: InputMaybe<Device_Usage_Bool_Exp>;
  _or?: InputMaybe<Array<Device_Usage_Bool_Exp>>;
  battery_level?: InputMaybe<Smallint_Comparison_Exp>;
  client_name?: InputMaybe<String_Comparison_Exp>;
  client_type?: InputMaybe<String_Comparison_Exp>;
  device?: InputMaybe<Device_Bool_Exp>;
  device_id?: InputMaybe<Uuid_Comparison_Exp>;
  device_locations?: InputMaybe<Device_Location_Bool_Exp>;
  device_locations_aggregate?: InputMaybe<Device_Location_Aggregate_Bool_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  ip_address?: InputMaybe<Inet_Comparison_Exp>;
  platform_name?: InputMaybe<String_Comparison_Exp>;
  platform_version?: InputMaybe<String_Comparison_Exp>;
  used_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  used_by_id?: InputMaybe<Uuid_Comparison_Exp>;
  used_on_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "device_usage" */
export enum Device_Usage_Constraint {
  /** unique or primary key constraint on columns "id" */
  DeviceUsagePkey = 'device_usage_pkey'
}

/** input type for incrementing numeric columns in table "device_usage" */
export type Device_Usage_Inc_Input = {
  battery_level?: InputMaybe<Scalars['smallint']>;
  id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "device_usage" */
export type Device_Usage_Insert_Input = {
  battery_level?: InputMaybe<Scalars['smallint']>;
  client_name?: InputMaybe<Scalars['String']>;
  client_type?: InputMaybe<Scalars['String']>;
  device?: InputMaybe<Device_Obj_Rel_Insert_Input>;
  device_id?: InputMaybe<Scalars['uuid']>;
  device_locations?: InputMaybe<Device_Location_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['bigint']>;
  ip_address?: InputMaybe<Scalars['inet']>;
  platform_name?: InputMaybe<Scalars['String']>;
  platform_version?: InputMaybe<Scalars['String']>;
  used_at?: InputMaybe<Scalars['timestamptz']>;
  used_by_id?: InputMaybe<Scalars['uuid']>;
  used_on_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Device_Usage_Max_Fields = {
  __typename?: 'device_usage_max_fields';
  battery_level?: Maybe<Scalars['smallint']>;
  client_name?: Maybe<Scalars['String']>;
  client_type?: Maybe<Scalars['String']>;
  device_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['bigint']>;
  platform_name?: Maybe<Scalars['String']>;
  platform_version?: Maybe<Scalars['String']>;
  used_at?: Maybe<Scalars['timestamptz']>;
  used_by_id?: Maybe<Scalars['uuid']>;
  used_on_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "device_usage" */
export type Device_Usage_Max_Order_By = {
  battery_level?: InputMaybe<Order_By>;
  client_name?: InputMaybe<Order_By>;
  client_type?: InputMaybe<Order_By>;
  device_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  platform_name?: InputMaybe<Order_By>;
  platform_version?: InputMaybe<Order_By>;
  used_at?: InputMaybe<Order_By>;
  used_by_id?: InputMaybe<Order_By>;
  used_on_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Device_Usage_Min_Fields = {
  __typename?: 'device_usage_min_fields';
  battery_level?: Maybe<Scalars['smallint']>;
  client_name?: Maybe<Scalars['String']>;
  client_type?: Maybe<Scalars['String']>;
  device_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['bigint']>;
  platform_name?: Maybe<Scalars['String']>;
  platform_version?: Maybe<Scalars['String']>;
  used_at?: Maybe<Scalars['timestamptz']>;
  used_by_id?: Maybe<Scalars['uuid']>;
  used_on_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "device_usage" */
export type Device_Usage_Min_Order_By = {
  battery_level?: InputMaybe<Order_By>;
  client_name?: InputMaybe<Order_By>;
  client_type?: InputMaybe<Order_By>;
  device_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  platform_name?: InputMaybe<Order_By>;
  platform_version?: InputMaybe<Order_By>;
  used_at?: InputMaybe<Order_By>;
  used_by_id?: InputMaybe<Order_By>;
  used_on_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "device_usage" */
export type Device_Usage_Mutation_Response = {
  __typename?: 'device_usage_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Device_Usage>;
};

/** input type for inserting object relation for remote table "device_usage" */
export type Device_Usage_Obj_Rel_Insert_Input = {
  data: Device_Usage_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Device_Usage_On_Conflict>;
};

/** on_conflict condition type for table "device_usage" */
export type Device_Usage_On_Conflict = {
  constraint: Device_Usage_Constraint;
  update_columns?: Array<Device_Usage_Update_Column>;
  where?: InputMaybe<Device_Usage_Bool_Exp>;
};

/** Ordering options when selecting data from "device_usage". */
export type Device_Usage_Order_By = {
  battery_level?: InputMaybe<Order_By>;
  client_name?: InputMaybe<Order_By>;
  client_type?: InputMaybe<Order_By>;
  device?: InputMaybe<Device_Order_By>;
  device_id?: InputMaybe<Order_By>;
  device_locations_aggregate?: InputMaybe<Device_Location_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  ip_address?: InputMaybe<Order_By>;
  platform_name?: InputMaybe<Order_By>;
  platform_version?: InputMaybe<Order_By>;
  used_at?: InputMaybe<Order_By>;
  used_by_id?: InputMaybe<Order_By>;
  used_on_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: device_usage */
export type Device_Usage_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "device_usage" */
export enum Device_Usage_Select_Column {
  /** column name */
  BatteryLevel = 'battery_level',
  /** column name */
  ClientName = 'client_name',
  /** column name */
  ClientType = 'client_type',
  /** column name */
  DeviceId = 'device_id',
  /** column name */
  Id = 'id',
  /** column name */
  IpAddress = 'ip_address',
  /** column name */
  PlatformName = 'platform_name',
  /** column name */
  PlatformVersion = 'platform_version',
  /** column name */
  UsedAt = 'used_at',
  /** column name */
  UsedById = 'used_by_id',
  /** column name */
  UsedOnId = 'used_on_id'
}

/** input type for updating data in table "device_usage" */
export type Device_Usage_Set_Input = {
  battery_level?: InputMaybe<Scalars['smallint']>;
  client_name?: InputMaybe<Scalars['String']>;
  client_type?: InputMaybe<Scalars['String']>;
  device_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  ip_address?: InputMaybe<Scalars['inet']>;
  platform_name?: InputMaybe<Scalars['String']>;
  platform_version?: InputMaybe<Scalars['String']>;
  used_at?: InputMaybe<Scalars['timestamptz']>;
  used_by_id?: InputMaybe<Scalars['uuid']>;
  used_on_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Device_Usage_Stddev_Fields = {
  __typename?: 'device_usage_stddev_fields';
  battery_level?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "device_usage" */
export type Device_Usage_Stddev_Order_By = {
  battery_level?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Device_Usage_Stddev_Pop_Fields = {
  __typename?: 'device_usage_stddev_pop_fields';
  battery_level?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "device_usage" */
export type Device_Usage_Stddev_Pop_Order_By = {
  battery_level?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Device_Usage_Stddev_Samp_Fields = {
  __typename?: 'device_usage_stddev_samp_fields';
  battery_level?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "device_usage" */
export type Device_Usage_Stddev_Samp_Order_By = {
  battery_level?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "device_usage" */
export type Device_Usage_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Device_Usage_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Device_Usage_Stream_Cursor_Value_Input = {
  battery_level?: InputMaybe<Scalars['smallint']>;
  client_name?: InputMaybe<Scalars['String']>;
  client_type?: InputMaybe<Scalars['String']>;
  device_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  ip_address?: InputMaybe<Scalars['inet']>;
  platform_name?: InputMaybe<Scalars['String']>;
  platform_version?: InputMaybe<Scalars['String']>;
  used_at?: InputMaybe<Scalars['timestamptz']>;
  used_by_id?: InputMaybe<Scalars['uuid']>;
  used_on_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate sum on columns */
export type Device_Usage_Sum_Fields = {
  __typename?: 'device_usage_sum_fields';
  battery_level?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "device_usage" */
export type Device_Usage_Sum_Order_By = {
  battery_level?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "device_usage" */
export enum Device_Usage_Update_Column {
  /** column name */
  BatteryLevel = 'battery_level',
  /** column name */
  ClientName = 'client_name',
  /** column name */
  ClientType = 'client_type',
  /** column name */
  DeviceId = 'device_id',
  /** column name */
  Id = 'id',
  /** column name */
  IpAddress = 'ip_address',
  /** column name */
  PlatformName = 'platform_name',
  /** column name */
  PlatformVersion = 'platform_version',
  /** column name */
  UsedAt = 'used_at',
  /** column name */
  UsedById = 'used_by_id',
  /** column name */
  UsedOnId = 'used_on_id'
}

export type Device_Usage_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Device_Usage_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Device_Usage_Set_Input>;
  /** filter the rows which have to be updated */
  where: Device_Usage_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Device_Usage_Var_Pop_Fields = {
  __typename?: 'device_usage_var_pop_fields';
  battery_level?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "device_usage" */
export type Device_Usage_Var_Pop_Order_By = {
  battery_level?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Device_Usage_Var_Samp_Fields = {
  __typename?: 'device_usage_var_samp_fields';
  battery_level?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "device_usage" */
export type Device_Usage_Var_Samp_Order_By = {
  battery_level?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Device_Usage_Variance_Fields = {
  __typename?: 'device_usage_variance_fields';
  battery_level?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "device_usage" */
export type Device_Usage_Variance_Order_By = {
  battery_level?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

export type Directus_Access = {
  __typename?: 'directus_access';
  id: Scalars['ID'];
  policy?: Maybe<Directus_Policies>;
  role?: Maybe<Directus_Roles>;
  sort?: Maybe<Scalars['Int']>;
  user?: Maybe<Directus_Users>;
};


export type Directus_AccessPolicyArgs = {
  filter?: InputMaybe<Directus_Policies_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_AccessRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_AccessUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Access_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Access_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Access_Filter>>>;
  id?: InputMaybe<String_Filter_Operators>;
  policy?: InputMaybe<Directus_Policies_Filter>;
  role?: InputMaybe<Directus_Roles_Filter>;
  sort?: InputMaybe<Number_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Access_Mutated = {
  __typename?: 'directus_access_mutated';
  data?: Maybe<Directus_Access>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Activity = {
  __typename?: 'directus_activity';
  action: Scalars['String'];
  collection: Scalars['String'];
  id: Scalars['ID'];
  ip?: Maybe<Scalars['String']>;
  item: Scalars['String'];
  origin?: Maybe<Scalars['String']>;
  revisions?: Maybe<Array<Maybe<Directus_Revisions>>>;
  revisions_func?: Maybe<Count_Functions>;
  timestamp?: Maybe<Scalars['Date']>;
  timestamp_func?: Maybe<Datetime_Functions>;
  user?: Maybe<Directus_Users>;
  user_agent?: Maybe<Scalars['String']>;
};


export type Directus_ActivityRevisionsArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_ActivityUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Activity_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Activity_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Activity_Filter>>>;
  action?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  ip?: InputMaybe<String_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  origin?: InputMaybe<String_Filter_Operators>;
  revisions?: InputMaybe<Directus_Revisions_Filter>;
  revisions_func?: InputMaybe<Count_Function_Filter_Operators>;
  timestamp?: InputMaybe<Date_Filter_Operators>;
  timestamp_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
  user_agent?: InputMaybe<String_Filter_Operators>;
};

export type Directus_Activity_Mutated = {
  __typename?: 'directus_activity_mutated';
  data?: Maybe<Directus_Activity>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Comments = {
  __typename?: 'directus_comments';
  collection: Scalars['String'];
  comment: Scalars['String'];
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  item: Scalars['String'];
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type Directus_CommentsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_CommentsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Comments_Mutated = {
  __typename?: 'directus_comments_mutated';
  data?: Maybe<Directus_Comments>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Dashboards = {
  __typename?: 'directus_dashboards';
  color?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  panels?: Maybe<Array<Maybe<Directus_Panels>>>;
  panels_func?: Maybe<Count_Functions>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_DashboardsPanelsArgs = {
  filter?: InputMaybe<Directus_Panels_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_DashboardsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Dashboards_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Dashboards_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Dashboards_Filter>>>;
  color?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  panels?: InputMaybe<Directus_Panels_Filter>;
  panels_func?: InputMaybe<Count_Function_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Dashboards_Mutated = {
  __typename?: 'directus_dashboards_mutated';
  data?: Maybe<Directus_Dashboards>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Files = {
  __typename?: 'directus_files';
  charset?: Maybe<Scalars['String']>;
  created_on?: Maybe<Scalars['Date']>;
  created_on_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  embed?: Maybe<Scalars['String']>;
  filename_disk?: Maybe<Scalars['String']>;
  filename_download: Scalars['String'];
  filesize?: Maybe<Scalars['GraphQLBigInt']>;
  focal_point_x?: Maybe<Scalars['Int']>;
  focal_point_y?: Maybe<Scalars['Int']>;
  folder?: Maybe<Directus_Folders>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  metadata_func?: Maybe<Count_Functions>;
  modified_by?: Maybe<Directus_Users>;
  modified_on?: Maybe<Scalars['Date']>;
  modified_on_func?: Maybe<Datetime_Functions>;
  storage: Scalars['String'];
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']>;
  tus_data?: Maybe<Scalars['JSON']>;
  tus_data_func?: Maybe<Count_Functions>;
  tus_id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uploaded_by?: Maybe<Directus_Users>;
  uploaded_on?: Maybe<Scalars['Date']>;
  uploaded_on_func?: Maybe<Datetime_Functions>;
  width?: Maybe<Scalars['Int']>;
};


export type Directus_FilesFolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_FilesModified_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_FilesUploaded_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Files_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  charset?: InputMaybe<String_Filter_Operators>;
  created_on?: InputMaybe<Date_Filter_Operators>;
  created_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  duration?: InputMaybe<Number_Filter_Operators>;
  embed?: InputMaybe<String_Filter_Operators>;
  filename_disk?: InputMaybe<String_Filter_Operators>;
  filename_download?: InputMaybe<String_Filter_Operators>;
  filesize?: InputMaybe<Big_Int_Filter_Operators>;
  focal_point_x?: InputMaybe<Number_Filter_Operators>;
  focal_point_y?: InputMaybe<Number_Filter_Operators>;
  folder?: InputMaybe<Directus_Folders_Filter>;
  height?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  metadata?: InputMaybe<String_Filter_Operators>;
  metadata_func?: InputMaybe<Count_Function_Filter_Operators>;
  modified_by?: InputMaybe<Directus_Users_Filter>;
  modified_on?: InputMaybe<Date_Filter_Operators>;
  modified_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  storage?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  tus_data?: InputMaybe<String_Filter_Operators>;
  tus_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  tus_id?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  uploaded_by?: InputMaybe<Directus_Users_Filter>;
  uploaded_on?: InputMaybe<Date_Filter_Operators>;
  uploaded_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Files_Mutated = {
  __typename?: 'directus_files_mutated';
  data?: Maybe<Directus_Files>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Flows = {
  __typename?: 'directus_flows';
  accountability?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  operation?: Maybe<Directus_Operations>;
  operations?: Maybe<Array<Maybe<Directus_Operations>>>;
  operations_func?: Maybe<Count_Functions>;
  options?: Maybe<Scalars['JSON']>;
  options_func?: Maybe<Count_Functions>;
  status?: Maybe<Scalars['String']>;
  trigger?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_FlowsOperationArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_FlowsOperationsArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_FlowsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Flows_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Flows_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Flows_Filter>>>;
  accountability?: InputMaybe<String_Filter_Operators>;
  color?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  operation?: InputMaybe<Directus_Operations_Filter>;
  operations?: InputMaybe<Directus_Operations_Filter>;
  operations_func?: InputMaybe<Count_Function_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  trigger?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Flows_Mutated = {
  __typename?: 'directus_flows_mutated';
  data?: Maybe<Directus_Flows>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Folders = {
  __typename?: 'directus_folders';
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<Directus_Folders>;
};


export type Directus_FoldersParentArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Folders_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Folders_Filter>;
};

export type Directus_Folders_Mutated = {
  __typename?: 'directus_folders_mutated';
  data?: Maybe<Directus_Folders>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Notifications = {
  __typename?: 'directus_notifications';
  collection?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  item?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  recipient?: Maybe<Directus_Users>;
  sender?: Maybe<Directus_Users>;
  status?: Maybe<Scalars['String']>;
  subject: Scalars['String'];
  timestamp?: Maybe<Scalars['Date']>;
  timestamp_func?: Maybe<Datetime_Functions>;
};


export type Directus_NotificationsRecipientArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_NotificationsSenderArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Notifications_Mutated = {
  __typename?: 'directus_notifications_mutated';
  data?: Maybe<Directus_Notifications>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Operations = {
  __typename?: 'directus_operations';
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  flow?: Maybe<Directus_Flows>;
  id: Scalars['ID'];
  key: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Scalars['JSON']>;
  options_func?: Maybe<Count_Functions>;
  position_x: Scalars['Int'];
  position_y: Scalars['Int'];
  reject?: Maybe<Directus_Operations>;
  resolve?: Maybe<Directus_Operations>;
  type: Scalars['String'];
  user_created?: Maybe<Directus_Users>;
};


export type Directus_OperationsFlowArgs = {
  filter?: InputMaybe<Directus_Flows_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_OperationsRejectArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_OperationsResolveArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_OperationsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Operations_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  flow?: InputMaybe<Directus_Flows_Filter>;
  id?: InputMaybe<String_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  reject?: InputMaybe<Directus_Operations_Filter>;
  resolve?: InputMaybe<Directus_Operations_Filter>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Operations_Mutated = {
  __typename?: 'directus_operations_mutated';
  data?: Maybe<Directus_Operations>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Panels = {
  __typename?: 'directus_panels';
  color?: Maybe<Scalars['String']>;
  dashboard?: Maybe<Directus_Dashboards>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  height: Scalars['Int'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  options?: Maybe<Scalars['JSON']>;
  options_func?: Maybe<Count_Functions>;
  position_x: Scalars['Int'];
  position_y: Scalars['Int'];
  show_header: Scalars['Boolean'];
  type: Scalars['String'];
  user_created?: Maybe<Directus_Users>;
  width: Scalars['Int'];
};


export type Directus_PanelsDashboardArgs = {
  filter?: InputMaybe<Directus_Dashboards_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_PanelsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Panels_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  color?: InputMaybe<String_Filter_Operators>;
  dashboard?: InputMaybe<Directus_Dashboards_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  show_header?: InputMaybe<Boolean_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Panels_Mutated = {
  __typename?: 'directus_panels_mutated';
  data?: Maybe<Directus_Panels>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Permissions = {
  __typename?: 'directus_permissions';
  action: Scalars['String'];
  collection: Scalars['String'];
  fields?: Maybe<Array<Maybe<Scalars['String']>>>;
  id?: Maybe<Scalars['ID']>;
  permissions?: Maybe<Scalars['JSON']>;
  permissions_func?: Maybe<Count_Functions>;
  policy?: Maybe<Directus_Policies>;
  presets?: Maybe<Scalars['JSON']>;
  presets_func?: Maybe<Count_Functions>;
  validation?: Maybe<Scalars['JSON']>;
  validation_func?: Maybe<Count_Functions>;
};


export type Directus_PermissionsPolicyArgs = {
  filter?: InputMaybe<Directus_Policies_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Permissions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  action?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  fields?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  permissions?: InputMaybe<String_Filter_Operators>;
  permissions_func?: InputMaybe<Count_Function_Filter_Operators>;
  policy?: InputMaybe<Directus_Policies_Filter>;
  presets?: InputMaybe<String_Filter_Operators>;
  presets_func?: InputMaybe<Count_Function_Filter_Operators>;
  validation?: InputMaybe<String_Filter_Operators>;
  validation_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Permissions_Mutated = {
  __typename?: 'directus_permissions_mutated';
  data?: Maybe<Directus_Permissions>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Policies = {
  __typename?: 'directus_policies';
  admin_access: Scalars['Boolean'];
  app_access: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  /** $t:field_options.directus_policies.enforce_tfa */
  enforce_tfa: Scalars['Boolean'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ip_access?: Maybe<Array<Maybe<Scalars['String']>>>;
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<Directus_Permissions>>>;
  permissions_func?: Maybe<Count_Functions>;
  roles?: Maybe<Array<Maybe<Directus_Access>>>;
  roles_func?: Maybe<Count_Functions>;
  users?: Maybe<Array<Maybe<Directus_Access>>>;
  users_func?: Maybe<Count_Functions>;
};


export type Directus_PoliciesPermissionsArgs = {
  filter?: InputMaybe<Directus_Permissions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_PoliciesRolesArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_PoliciesUsersArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Policies_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Policies_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Policies_Filter>>>;
  admin_access?: InputMaybe<Boolean_Filter_Operators>;
  app_access?: InputMaybe<Boolean_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  enforce_tfa?: InputMaybe<Boolean_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  ip_access?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  permissions?: InputMaybe<Directus_Permissions_Filter>;
  permissions_func?: InputMaybe<Count_Function_Filter_Operators>;
  roles?: InputMaybe<Directus_Access_Filter>;
  roles_func?: InputMaybe<Count_Function_Filter_Operators>;
  users?: InputMaybe<Directus_Access_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Policies_Mutated = {
  __typename?: 'directus_policies_mutated';
  data?: Maybe<Directus_Policies>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Presets = {
  __typename?: 'directus_presets';
  bookmark?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['JSON']>;
  filter_func?: Maybe<Count_Functions>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  layout?: Maybe<Scalars['String']>;
  layout_options?: Maybe<Scalars['JSON']>;
  layout_options_func?: Maybe<Count_Functions>;
  layout_query?: Maybe<Scalars['JSON']>;
  layout_query_func?: Maybe<Count_Functions>;
  refresh_interval?: Maybe<Scalars['Int']>;
  role?: Maybe<Directus_Roles>;
  search?: Maybe<Scalars['String']>;
  user?: Maybe<Directus_Users>;
};


export type Directus_PresetsRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_PresetsUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Presets_Mutated = {
  __typename?: 'directus_presets_mutated';
  data?: Maybe<Directus_Presets>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Revisions = {
  __typename?: 'directus_revisions';
  activity?: Maybe<Directus_Activity>;
  collection: Scalars['String'];
  data?: Maybe<Scalars['JSON']>;
  data_func?: Maybe<Count_Functions>;
  delta?: Maybe<Scalars['JSON']>;
  delta_func?: Maybe<Count_Functions>;
  id: Scalars['ID'];
  item: Scalars['String'];
  parent?: Maybe<Directus_Revisions>;
  version?: Maybe<Directus_Versions>;
};


export type Directus_RevisionsActivityArgs = {
  filter?: InputMaybe<Directus_Activity_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_RevisionsParentArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_RevisionsVersionArgs = {
  filter?: InputMaybe<Directus_Versions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Revisions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  activity?: InputMaybe<Directus_Activity_Filter>;
  collection?: InputMaybe<String_Filter_Operators>;
  data?: InputMaybe<String_Filter_Operators>;
  data_func?: InputMaybe<Count_Function_Filter_Operators>;
  delta?: InputMaybe<String_Filter_Operators>;
  delta_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Revisions_Filter>;
  version?: InputMaybe<Directus_Versions_Filter>;
};

export type Directus_Revisions_Mutated = {
  __typename?: 'directus_revisions_mutated';
  data?: Maybe<Directus_Revisions>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Roles = {
  __typename?: 'directus_roles';
  children?: Maybe<Array<Maybe<Directus_Roles>>>;
  children_func?: Maybe<Count_Functions>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<Directus_Roles>;
  policies?: Maybe<Array<Maybe<Directus_Access>>>;
  policies_func?: Maybe<Count_Functions>;
  users?: Maybe<Array<Maybe<Directus_Users>>>;
  users_func?: Maybe<Count_Functions>;
};


export type Directus_RolesChildrenArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_RolesParentArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_RolesPoliciesArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_RolesUsersArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Roles_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  children?: InputMaybe<Directus_Roles_Filter>;
  children_func?: InputMaybe<Count_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Roles_Filter>;
  policies?: InputMaybe<Directus_Access_Filter>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  users?: InputMaybe<Directus_Users_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Roles_Mutated = {
  __typename?: 'directus_roles_mutated';
  data?: Maybe<Directus_Roles>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Settings = {
  __typename?: 'directus_settings';
  auth_login_attempts?: Maybe<Scalars['Int']>;
  auth_password_policy?: Maybe<Scalars['String']>;
  basemaps?: Maybe<Scalars['JSON']>;
  basemaps_func?: Maybe<Count_Functions>;
  custom_aspect_ratios?: Maybe<Scalars['JSON']>;
  custom_aspect_ratios_func?: Maybe<Count_Functions>;
  custom_css?: Maybe<Scalars['String']>;
  default_appearance?: Maybe<Scalars['String']>;
  default_language?: Maybe<Scalars['String']>;
  default_theme_dark?: Maybe<Scalars['String']>;
  default_theme_light?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mapbox_key?: Maybe<Scalars['String']>;
  module_bar?: Maybe<Scalars['JSON']>;
  module_bar_func?: Maybe<Count_Functions>;
  /** $t:field_options.directus_settings.project_color_note */
  project_color?: Maybe<Scalars['String']>;
  project_descriptor?: Maybe<Scalars['String']>;
  project_logo?: Maybe<Directus_Files>;
  project_name?: Maybe<Scalars['String']>;
  project_url?: Maybe<Scalars['String']>;
  public_background?: Maybe<Directus_Files>;
  public_favicon?: Maybe<Directus_Files>;
  public_foreground?: Maybe<Directus_Files>;
  public_note?: Maybe<Scalars['String']>;
  /** $t:fields.directus_settings.public_registration_note */
  public_registration: Scalars['Boolean'];
  /** $t:fields.directus_settings.public_registration_email_filter_note */
  public_registration_email_filter?: Maybe<Scalars['JSON']>;
  public_registration_email_filter_func?: Maybe<Count_Functions>;
  public_registration_role?: Maybe<Directus_Roles>;
  /** $t:fields.directus_settings.public_registration_verify_email_note */
  public_registration_verify_email?: Maybe<Scalars['Boolean']>;
  report_bug_url?: Maybe<Scalars['String']>;
  report_error_url?: Maybe<Scalars['String']>;
  report_feature_url?: Maybe<Scalars['String']>;
  storage_asset_presets?: Maybe<Scalars['JSON']>;
  storage_asset_presets_func?: Maybe<Count_Functions>;
  storage_asset_transform?: Maybe<Scalars['String']>;
  storage_default_folder?: Maybe<Directus_Folders>;
  theme_dark_overrides?: Maybe<Scalars['JSON']>;
  theme_dark_overrides_func?: Maybe<Count_Functions>;
  theme_light_overrides?: Maybe<Scalars['JSON']>;
  theme_light_overrides_func?: Maybe<Count_Functions>;
};


export type Directus_SettingsProject_LogoArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_SettingsPublic_BackgroundArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_SettingsPublic_FaviconArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_SettingsPublic_ForegroundArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_SettingsPublic_Registration_RoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_SettingsStorage_Default_FolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Settings_Mutated = {
  __typename?: 'directus_settings_mutated';
  data?: Maybe<Directus_Settings>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Shares = {
  __typename?: 'directus_shares';
  collection: Scalars['String'];
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_end?: Maybe<Scalars['Date']>;
  date_end_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_start?: Maybe<Scalars['Date']>;
  date_start_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  item: Scalars['String'];
  /** $t:shared_leave_blank_for_unlimited */
  max_uses?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** $t:shared_leave_blank_for_passwordless_access */
  password?: Maybe<Scalars['Hash']>;
  role?: Maybe<Directus_Roles>;
  times_used?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_SharesRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_SharesUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Shares_Mutated = {
  __typename?: 'directus_shares_mutated';
  data?: Maybe<Directus_Shares>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Translations = {
  __typename?: 'directus_translations';
  id: Scalars['ID'];
  key: Scalars['String'];
  language: Scalars['String'];
  value: Scalars['String'];
};

export type Directus_Translations_Mutated = {
  __typename?: 'directus_translations_mutated';
  data?: Maybe<Directus_Translations>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Users = {
  __typename?: 'directus_users';
  appearance?: Maybe<Scalars['String']>;
  auth_data?: Maybe<Scalars['JSON']>;
  auth_data_func?: Maybe<Count_Functions>;
  avatar?: Maybe<Directus_Files>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_notifications?: Maybe<Scalars['Boolean']>;
  external_identifier?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  language?: Maybe<Scalars['String']>;
  last_access?: Maybe<Scalars['Date']>;
  last_access_func?: Maybe<Datetime_Functions>;
  last_name?: Maybe<Scalars['String']>;
  last_page?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['Hash']>;
  policies?: Maybe<Array<Maybe<Directus_Access>>>;
  policies_func?: Maybe<Count_Functions>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<Directus_Roles>;
  status?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  tfa_secret?: Maybe<Scalars['Hash']>;
  theme_dark?: Maybe<Scalars['String']>;
  theme_dark_overrides?: Maybe<Scalars['JSON']>;
  theme_dark_overrides_func?: Maybe<Count_Functions>;
  theme_light?: Maybe<Scalars['String']>;
  theme_light_overrides?: Maybe<Scalars['JSON']>;
  theme_light_overrides_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['Hash']>;
};


export type Directus_UsersAvatarArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_UsersPoliciesArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_UsersRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Users_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  appearance?: InputMaybe<String_Filter_Operators>;
  auth_data?: InputMaybe<String_Filter_Operators>;
  auth_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  avatar?: InputMaybe<Directus_Files_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  email_notifications?: InputMaybe<Boolean_Filter_Operators>;
  external_identifier?: InputMaybe<String_Filter_Operators>;
  first_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  language?: InputMaybe<String_Filter_Operators>;
  last_access?: InputMaybe<Date_Filter_Operators>;
  last_access_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  last_name?: InputMaybe<String_Filter_Operators>;
  last_page?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<Hash_Filter_Operators>;
  policies?: InputMaybe<Directus_Access_Filter>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  provider?: InputMaybe<String_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  tfa_secret?: InputMaybe<Hash_Filter_Operators>;
  theme_dark?: InputMaybe<String_Filter_Operators>;
  theme_dark_overrides?: InputMaybe<String_Filter_Operators>;
  theme_dark_overrides_func?: InputMaybe<Count_Function_Filter_Operators>;
  theme_light?: InputMaybe<String_Filter_Operators>;
  theme_light_overrides?: InputMaybe<String_Filter_Operators>;
  theme_light_overrides_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  token?: InputMaybe<Hash_Filter_Operators>;
};

export type Directus_Users_Mutated = {
  __typename?: 'directus_users_mutated';
  data?: Maybe<Directus_Users>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Versions = {
  __typename?: 'directus_versions';
  collection: Scalars['String'];
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  delta?: Maybe<Scalars['JSON']>;
  delta_func?: Maybe<Count_Functions>;
  hash?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  item: Scalars['String'];
  key: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type Directus_VersionsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_VersionsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Versions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Versions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Versions_Filter>>>;
  collection?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  delta?: InputMaybe<String_Filter_Operators>;
  delta_func?: InputMaybe<Count_Function_Filter_Operators>;
  hash?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Versions_Mutated = {
  __typename?: 'directus_versions_mutated';
  data?: Maybe<Directus_Versions>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Directus_Webhooks = {
  __typename?: 'directus_webhooks';
  actions: Array<Maybe<Scalars['String']>>;
  collections: Array<Maybe<Scalars['String']>>;
  data?: Maybe<Scalars['Boolean']>;
  headers?: Maybe<Scalars['JSON']>;
  headers_func?: Maybe<Count_Functions>;
  id: Scalars['ID'];
  method?: Maybe<Scalars['String']>;
  migrated_flow?: Maybe<Directus_Flows>;
  name: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  was_active_before_deprecation: Scalars['Boolean'];
};


export type Directus_WebhooksMigrated_FlowArgs = {
  filter?: InputMaybe<Directus_Flows_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Webhooks_Mutated = {
  __typename?: 'directus_webhooks_mutated';
  data?: Maybe<Directus_Webhooks>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

/** columns and relationships of "ecg_files" */
export type Ecg_Files = {
  __typename?: 'ecg_files';
  bucket: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  file_name: Scalars['String'];
  /** An object relationship */
  heart_data: Heart_Data;
  heart_data_id: Scalars['uuid'];
  id: Scalars['uuid'];
  key: Scalars['String'];
  owner?: Maybe<User>;
  owner_id: Scalars['String'];
  sample_rate: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "ecg_files" */
export type Ecg_Files_Aggregate = {
  __typename?: 'ecg_files_aggregate';
  aggregate?: Maybe<Ecg_Files_Aggregate_Fields>;
  nodes: Array<Ecg_Files>;
};

/** aggregate fields of "ecg_files" */
export type Ecg_Files_Aggregate_Fields = {
  __typename?: 'ecg_files_aggregate_fields';
  avg?: Maybe<Ecg_Files_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Ecg_Files_Max_Fields>;
  min?: Maybe<Ecg_Files_Min_Fields>;
  stddev?: Maybe<Ecg_Files_Stddev_Fields>;
  stddev_pop?: Maybe<Ecg_Files_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Ecg_Files_Stddev_Samp_Fields>;
  sum?: Maybe<Ecg_Files_Sum_Fields>;
  var_pop?: Maybe<Ecg_Files_Var_Pop_Fields>;
  var_samp?: Maybe<Ecg_Files_Var_Samp_Fields>;
  variance?: Maybe<Ecg_Files_Variance_Fields>;
};


/** aggregate fields of "ecg_files" */
export type Ecg_Files_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ecg_Files_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Ecg_Files_Avg_Fields = {
  __typename?: 'ecg_files_avg_fields';
  sample_rate?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "ecg_files". All fields are combined with a logical 'AND'. */
export type Ecg_Files_Bool_Exp = {
  _and?: InputMaybe<Array<Ecg_Files_Bool_Exp>>;
  _not?: InputMaybe<Ecg_Files_Bool_Exp>;
  _or?: InputMaybe<Array<Ecg_Files_Bool_Exp>>;
  bucket?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  file_name?: InputMaybe<String_Comparison_Exp>;
  heart_data?: InputMaybe<Heart_Data_Bool_Exp>;
  heart_data_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  sample_rate?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "ecg_files" */
export enum Ecg_Files_Constraint {
  /** unique or primary key constraint on columns "heart_data_id" */
  EcgFilesHeartDataIdKey = 'ecg_files_heart_data_id_key',
  /** unique or primary key constraint on columns "id" */
  EcgFilesPkey = 'ecg_files_pkey'
}

/** input type for incrementing numeric columns in table "ecg_files" */
export type Ecg_Files_Inc_Input = {
  sample_rate?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "ecg_files" */
export type Ecg_Files_Insert_Input = {
  bucket?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  file_name?: InputMaybe<Scalars['String']>;
  heart_data?: InputMaybe<Heart_Data_Obj_Rel_Insert_Input>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
  sample_rate?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Ecg_Files_Max_Fields = {
  __typename?: 'ecg_files_max_fields';
  bucket?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  file_name?: Maybe<Scalars['String']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  key?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  sample_rate?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Ecg_Files_Min_Fields = {
  __typename?: 'ecg_files_min_fields';
  bucket?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  file_name?: Maybe<Scalars['String']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  key?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  sample_rate?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "ecg_files" */
export type Ecg_Files_Mutation_Response = {
  __typename?: 'ecg_files_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Ecg_Files>;
};

/** input type for inserting object relation for remote table "ecg_files" */
export type Ecg_Files_Obj_Rel_Insert_Input = {
  data: Ecg_Files_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Ecg_Files_On_Conflict>;
};

/** on_conflict condition type for table "ecg_files" */
export type Ecg_Files_On_Conflict = {
  constraint: Ecg_Files_Constraint;
  update_columns?: Array<Ecg_Files_Update_Column>;
  where?: InputMaybe<Ecg_Files_Bool_Exp>;
};

/** Ordering options when selecting data from "ecg_files". */
export type Ecg_Files_Order_By = {
  bucket?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  file_name?: InputMaybe<Order_By>;
  heart_data?: InputMaybe<Heart_Data_Order_By>;
  heart_data_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  sample_rate?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ecg_files */
export type Ecg_Files_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "ecg_files" */
export enum Ecg_Files_Select_Column {
  /** column name */
  Bucket = 'bucket',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  FileName = 'file_name',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  SampleRate = 'sample_rate',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "ecg_files" */
export type Ecg_Files_Set_Input = {
  bucket?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  file_name?: InputMaybe<Scalars['String']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
  sample_rate?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Ecg_Files_Stddev_Fields = {
  __typename?: 'ecg_files_stddev_fields';
  sample_rate?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Ecg_Files_Stddev_Pop_Fields = {
  __typename?: 'ecg_files_stddev_pop_fields';
  sample_rate?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Ecg_Files_Stddev_Samp_Fields = {
  __typename?: 'ecg_files_stddev_samp_fields';
  sample_rate?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "ecg_files" */
export type Ecg_Files_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ecg_Files_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ecg_Files_Stream_Cursor_Value_Input = {
  bucket?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  file_name?: InputMaybe<Scalars['String']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
  sample_rate?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Ecg_Files_Sum_Fields = {
  __typename?: 'ecg_files_sum_fields';
  sample_rate?: Maybe<Scalars['Int']>;
};

/** update columns of table "ecg_files" */
export enum Ecg_Files_Update_Column {
  /** column name */
  Bucket = 'bucket',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  FileName = 'file_name',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  SampleRate = 'sample_rate',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Ecg_Files_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Ecg_Files_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Ecg_Files_Set_Input>;
  /** filter the rows which have to be updated */
  where: Ecg_Files_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Ecg_Files_Var_Pop_Fields = {
  __typename?: 'ecg_files_var_pop_fields';
  sample_rate?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Ecg_Files_Var_Samp_Fields = {
  __typename?: 'ecg_files_var_samp_fields';
  sample_rate?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Ecg_Files_Variance_Fields = {
  __typename?: 'ecg_files_variance_fields';
  sample_rate?: Maybe<Scalars['Float']>;
};

export type Explanation = {
  __typename?: 'explanation';
  Ref_Key?: Maybe<Values>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  explanation?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  show_title?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type ExplanationRef_KeyArgs = {
  filter?: InputMaybe<Values_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ExplanationUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ExplanationUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Explanation_Aggregated = {
  __typename?: 'explanation_aggregated';
  avg?: Maybe<Explanation_Aggregated_Fields>;
  avgDistinct?: Maybe<Explanation_Aggregated_Fields>;
  count?: Maybe<Explanation_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Explanation_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Explanation_Aggregated_Fields>;
  min?: Maybe<Explanation_Aggregated_Fields>;
  sum?: Maybe<Explanation_Aggregated_Fields>;
  sumDistinct?: Maybe<Explanation_Aggregated_Fields>;
};

export type Explanation_Aggregated_Count = {
  __typename?: 'explanation_aggregated_count';
  Ref_Key?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  explanation?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  show_title?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Explanation_Aggregated_Fields = {
  __typename?: 'explanation_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Explanation_Filter = {
  Ref_Key?: InputMaybe<Values_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Explanation_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Explanation_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  explanation?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  show_title?: InputMaybe<Boolean_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Explanation_Mutated = {
  __typename?: 'explanation_mutated';
  data?: Maybe<Explanation>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

/** Doctors should always be the follower */
export type Followers = {
  __typename?: 'followers';
  accepted_on?: Maybe<Scalars['timestamptz']>;
  deleted_on?: Maybe<Scalars['timestamptz']>;
  followee?: Maybe<User>;
  followee_id: Scalars['String'];
  follower?: Maybe<User>;
  follower_id: Scalars['String'];
  id: Scalars['uuid'];
  requested_on: Scalars['timestamptz'];
};

/** aggregated selection of "followers" */
export type Followers_Aggregate = {
  __typename?: 'followers_aggregate';
  aggregate?: Maybe<Followers_Aggregate_Fields>;
  nodes: Array<Followers>;
};

/** aggregate fields of "followers" */
export type Followers_Aggregate_Fields = {
  __typename?: 'followers_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Followers_Max_Fields>;
  min?: Maybe<Followers_Min_Fields>;
};


/** aggregate fields of "followers" */
export type Followers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Followers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "followers". All fields are combined with a logical 'AND'. */
export type Followers_Bool_Exp = {
  _and?: InputMaybe<Array<Followers_Bool_Exp>>;
  _not?: InputMaybe<Followers_Bool_Exp>;
  _or?: InputMaybe<Array<Followers_Bool_Exp>>;
  accepted_on?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_on?: InputMaybe<Timestamptz_Comparison_Exp>;
  followee_id?: InputMaybe<String_Comparison_Exp>;
  follower_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  requested_on?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "followers" */
export enum Followers_Constraint {
  /** unique or primary key constraint on columns "followee_id", "follower_id" */
  FollowersFolloweeIdFollowerIdKey = 'followers_followee_id_follower_id_key',
  /** unique or primary key constraint on columns "id" */
  UserConnectionsPkey = 'user_connections_pkey'
}

/** input type for inserting data into table "followers" */
export type Followers_Insert_Input = {
  accepted_on?: InputMaybe<Scalars['timestamptz']>;
  deleted_on?: InputMaybe<Scalars['timestamptz']>;
  followee_id?: InputMaybe<Scalars['String']>;
  follower_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  requested_on?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Followers_Max_Fields = {
  __typename?: 'followers_max_fields';
  accepted_on?: Maybe<Scalars['timestamptz']>;
  deleted_on?: Maybe<Scalars['timestamptz']>;
  followee_id?: Maybe<Scalars['String']>;
  follower_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  requested_on?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Followers_Min_Fields = {
  __typename?: 'followers_min_fields';
  accepted_on?: Maybe<Scalars['timestamptz']>;
  deleted_on?: Maybe<Scalars['timestamptz']>;
  followee_id?: Maybe<Scalars['String']>;
  follower_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  requested_on?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "followers" */
export type Followers_Mutation_Response = {
  __typename?: 'followers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Followers>;
};

/** on_conflict condition type for table "followers" */
export type Followers_On_Conflict = {
  constraint: Followers_Constraint;
  update_columns?: Array<Followers_Update_Column>;
  where?: InputMaybe<Followers_Bool_Exp>;
};

/** Ordering options when selecting data from "followers". */
export type Followers_Order_By = {
  accepted_on?: InputMaybe<Order_By>;
  deleted_on?: InputMaybe<Order_By>;
  followee_id?: InputMaybe<Order_By>;
  follower_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  requested_on?: InputMaybe<Order_By>;
};

/** primary key columns input for table: followers */
export type Followers_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "followers" */
export enum Followers_Select_Column {
  /** column name */
  AcceptedOn = 'accepted_on',
  /** column name */
  DeletedOn = 'deleted_on',
  /** column name */
  FolloweeId = 'followee_id',
  /** column name */
  FollowerId = 'follower_id',
  /** column name */
  Id = 'id',
  /** column name */
  RequestedOn = 'requested_on'
}

/** input type for updating data in table "followers" */
export type Followers_Set_Input = {
  accepted_on?: InputMaybe<Scalars['timestamptz']>;
  deleted_on?: InputMaybe<Scalars['timestamptz']>;
  followee_id?: InputMaybe<Scalars['String']>;
  follower_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  requested_on?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "followers" */
export type Followers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Followers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Followers_Stream_Cursor_Value_Input = {
  accepted_on?: InputMaybe<Scalars['timestamptz']>;
  deleted_on?: InputMaybe<Scalars['timestamptz']>;
  followee_id?: InputMaybe<Scalars['String']>;
  follower_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  requested_on?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "followers" */
export enum Followers_Update_Column {
  /** column name */
  AcceptedOn = 'accepted_on',
  /** column name */
  DeletedOn = 'deleted_on',
  /** column name */
  FolloweeId = 'followee_id',
  /** column name */
  FollowerId = 'follower_id',
  /** column name */
  Id = 'id',
  /** column name */
  RequestedOn = 'requested_on'
}

export type Followers_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Followers_Set_Input>;
  /** filter the rows which have to be updated */
  where: Followers_Bool_Exp;
};

export type Get_Heart_Data_Answers_Args = {
  heart_data_ref?: InputMaybe<Scalars['uuid']>;
  survey_ref?: InputMaybe<Scalars['Int']>;
};

export type Global_Notifications = {
  __typename?: 'global_notifications';
  Title?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  message_type?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
};


export type Global_NotificationsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Global_Notifications_Aggregated = {
  __typename?: 'global_notifications_aggregated';
  avg?: Maybe<Global_Notifications_Aggregated_Fields>;
  avgDistinct?: Maybe<Global_Notifications_Aggregated_Fields>;
  count?: Maybe<Global_Notifications_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Global_Notifications_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Global_Notifications_Aggregated_Fields>;
  min?: Maybe<Global_Notifications_Aggregated_Fields>;
  sum?: Maybe<Global_Notifications_Aggregated_Fields>;
  sumDistinct?: Maybe<Global_Notifications_Aggregated_Fields>;
};

export type Global_Notifications_Aggregated_Count = {
  __typename?: 'global_notifications_aggregated_count';
  Title?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['Int']>;
  message_type?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
};

export type Global_Notifications_Aggregated_Fields = {
  __typename?: 'global_notifications_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Global_Notifications_Filter = {
  Title?: InputMaybe<String_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Global_Notifications_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Global_Notifications_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  message?: InputMaybe<String_Filter_Operators>;
  message_type?: InputMaybe<String_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Global_Notifications_Mutated = {
  __typename?: 'global_notifications_mutated';
  data?: Maybe<Global_Notifications>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Hash_Filter_Operators = {
  _empty?: InputMaybe<Scalars['Boolean']>;
  _nempty?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

/** columns and relationships of "heart_data" */
export type Heart_Data = {
  __typename?: 'heart_data';
  /** An object relationship */
  brain_spectrum?: Maybe<Brain_Spectrum>;
  created_on: Scalars['timestamptz'];
  data?: Maybe<Scalars['jsonb']>;
  deleted_on?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  ecg_file?: Maybe<Ecg_Files>;
  /** An array relationship */
  heart_data_tags: Array<Heart_Data_Tag>;
  /** An aggregate relationship */
  heart_data_tags_aggregate: Heart_Data_Tag_Aggregate;
  id: Scalars['uuid'];
  /** An array relationship */
  notes: Array<Note>;
  /** An aggregate relationship */
  notes_aggregate: Note_Aggregate;
  owner?: Maybe<Scalars['String']>;
  recording_location?: Maybe<Scalars['jsonb']>;
  /** An object relationship */
  rr_file?: Maybe<Rr_Files>;
  /** An object relationship */
  rr_metadata?: Maybe<Rr_Metadata>;
  status?: Maybe<Heart_Data_Progress_Type_Enum>;
  title: Scalars['String'];
  trend_recording: Scalars['Boolean'];
  user_profile?: Maybe<User>;
};


/** columns and relationships of "heart_data" */
export type Heart_DataDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "heart_data" */
export type Heart_DataHeart_Data_TagsArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Tag_Order_By>>;
  where?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
};


/** columns and relationships of "heart_data" */
export type Heart_DataHeart_Data_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Tag_Order_By>>;
  where?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
};


/** columns and relationships of "heart_data" */
export type Heart_DataNotesArgs = {
  distinct_on?: InputMaybe<Array<Note_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Note_Order_By>>;
  where?: InputMaybe<Note_Bool_Exp>;
};


/** columns and relationships of "heart_data" */
export type Heart_DataNotes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Note_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Note_Order_By>>;
  where?: InputMaybe<Note_Bool_Exp>;
};


/** columns and relationships of "heart_data" */
export type Heart_DataRecording_LocationArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "heart_data" */
export type Heart_Data_Aggregate = {
  __typename?: 'heart_data_aggregate';
  aggregate?: Maybe<Heart_Data_Aggregate_Fields>;
  nodes: Array<Heart_Data>;
};

/** aggregate fields of "heart_data" */
export type Heart_Data_Aggregate_Fields = {
  __typename?: 'heart_data_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Heart_Data_Max_Fields>;
  min?: Maybe<Heart_Data_Min_Fields>;
};


/** aggregate fields of "heart_data" */
export type Heart_Data_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Heart_Data_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Heart_Data_Append_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
  recording_location?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "heart_data". All fields are combined with a logical 'AND'. */
export type Heart_Data_Bool_Exp = {
  _and?: InputMaybe<Array<Heart_Data_Bool_Exp>>;
  _not?: InputMaybe<Heart_Data_Bool_Exp>;
  _or?: InputMaybe<Array<Heart_Data_Bool_Exp>>;
  brain_spectrum?: InputMaybe<Brain_Spectrum_Bool_Exp>;
  created_on?: InputMaybe<Timestamptz_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  deleted_on?: InputMaybe<Timestamptz_Comparison_Exp>;
  ecg_file?: InputMaybe<Ecg_Files_Bool_Exp>;
  heart_data_tags?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
  heart_data_tags_aggregate?: InputMaybe<Heart_Data_Tag_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  notes?: InputMaybe<Note_Bool_Exp>;
  notes_aggregate?: InputMaybe<Note_Aggregate_Bool_Exp>;
  owner?: InputMaybe<String_Comparison_Exp>;
  recording_location?: InputMaybe<Jsonb_Comparison_Exp>;
  rr_file?: InputMaybe<Rr_Files_Bool_Exp>;
  rr_metadata?: InputMaybe<Rr_Metadata_Bool_Exp>;
  status?: InputMaybe<Heart_Data_Progress_Type_Enum_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  trend_recording?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "heart_data" */
export enum Heart_Data_Constraint {
  /** unique or primary key constraint on columns "id" */
  HeartDataPkey = 'heart_data_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Heart_Data_Delete_At_Path_Input = {
  data?: InputMaybe<Array<Scalars['String']>>;
  recording_location?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Heart_Data_Delete_Elem_Input = {
  data?: InputMaybe<Scalars['Int']>;
  recording_location?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Heart_Data_Delete_Key_Input = {
  data?: InputMaybe<Scalars['String']>;
  recording_location?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "heart_data" */
export type Heart_Data_Insert_Input = {
  brain_spectrum?: InputMaybe<Brain_Spectrum_Obj_Rel_Insert_Input>;
  created_on?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  deleted_on?: InputMaybe<Scalars['timestamptz']>;
  ecg_file?: InputMaybe<Ecg_Files_Obj_Rel_Insert_Input>;
  heart_data_tags?: InputMaybe<Heart_Data_Tag_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  notes?: InputMaybe<Note_Arr_Rel_Insert_Input>;
  owner?: InputMaybe<Scalars['String']>;
  recording_location?: InputMaybe<Scalars['jsonb']>;
  rr_file?: InputMaybe<Rr_Files_Obj_Rel_Insert_Input>;
  rr_metadata?: InputMaybe<Rr_Metadata_Obj_Rel_Insert_Input>;
  status?: InputMaybe<Heart_Data_Progress_Type_Enum>;
  title?: InputMaybe<Scalars['String']>;
  trend_recording?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Heart_Data_Max_Fields = {
  __typename?: 'heart_data_max_fields';
  created_on?: Maybe<Scalars['timestamptz']>;
  deleted_on?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Heart_Data_Min_Fields = {
  __typename?: 'heart_data_min_fields';
  created_on?: Maybe<Scalars['timestamptz']>;
  deleted_on?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "heart_data" */
export type Heart_Data_Mutation_Response = {
  __typename?: 'heart_data_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Heart_Data>;
};

/** input type for inserting object relation for remote table "heart_data" */
export type Heart_Data_Obj_Rel_Insert_Input = {
  data: Heart_Data_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Heart_Data_On_Conflict>;
};

/** on_conflict condition type for table "heart_data" */
export type Heart_Data_On_Conflict = {
  constraint: Heart_Data_Constraint;
  update_columns?: Array<Heart_Data_Update_Column>;
  where?: InputMaybe<Heart_Data_Bool_Exp>;
};

/** Ordering options when selecting data from "heart_data". */
export type Heart_Data_Order_By = {
  brain_spectrum?: InputMaybe<Brain_Spectrum_Order_By>;
  created_on?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  deleted_on?: InputMaybe<Order_By>;
  ecg_file?: InputMaybe<Ecg_Files_Order_By>;
  heart_data_tags_aggregate?: InputMaybe<Heart_Data_Tag_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  notes_aggregate?: InputMaybe<Note_Aggregate_Order_By>;
  owner?: InputMaybe<Order_By>;
  recording_location?: InputMaybe<Order_By>;
  rr_file?: InputMaybe<Rr_Files_Order_By>;
  rr_metadata?: InputMaybe<Rr_Metadata_Order_By>;
  status?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  trend_recording?: InputMaybe<Order_By>;
};

/** primary key columns input for table: heart_data */
export type Heart_Data_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Heart_Data_Prepend_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
  recording_location?: InputMaybe<Scalars['jsonb']>;
};

/** columns and relationships of "heart_data_progress_type" */
export type Heart_Data_Progress_Type = {
  __typename?: 'heart_data_progress_type';
  description: Scalars['String'];
  value: Scalars['String'];
};

/** aggregated selection of "heart_data_progress_type" */
export type Heart_Data_Progress_Type_Aggregate = {
  __typename?: 'heart_data_progress_type_aggregate';
  aggregate?: Maybe<Heart_Data_Progress_Type_Aggregate_Fields>;
  nodes: Array<Heart_Data_Progress_Type>;
};

/** aggregate fields of "heart_data_progress_type" */
export type Heart_Data_Progress_Type_Aggregate_Fields = {
  __typename?: 'heart_data_progress_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Heart_Data_Progress_Type_Max_Fields>;
  min?: Maybe<Heart_Data_Progress_Type_Min_Fields>;
};


/** aggregate fields of "heart_data_progress_type" */
export type Heart_Data_Progress_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Heart_Data_Progress_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "heart_data_progress_type". All fields are combined with a logical 'AND'. */
export type Heart_Data_Progress_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Heart_Data_Progress_Type_Bool_Exp>>;
  _not?: InputMaybe<Heart_Data_Progress_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Heart_Data_Progress_Type_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "heart_data_progress_type" */
export enum Heart_Data_Progress_Type_Constraint {
  /** unique or primary key constraint on columns "value" */
  HeartDataProgressTypePkey = 'heart_data_progress_type_pkey'
}

export enum Heart_Data_Progress_Type_Enum {
  /** The processing of the recording failed */
  Failed = 'FAILED',
  /** The file is being processed */
  Processing = 'PROCESSING',
  /** The file was successfully processed */
  Success = 'SUCCESS',
  /** The recording was uploaded successfully */
  Uploaded = 'UPLOADED'
}

/** Boolean expression to compare columns of type "heart_data_progress_type_enum". All fields are combined with logical 'AND'. */
export type Heart_Data_Progress_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Heart_Data_Progress_Type_Enum>;
  _in?: InputMaybe<Array<Heart_Data_Progress_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Heart_Data_Progress_Type_Enum>;
  _nin?: InputMaybe<Array<Heart_Data_Progress_Type_Enum>>;
};

/** input type for inserting data into table "heart_data_progress_type" */
export type Heart_Data_Progress_Type_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Heart_Data_Progress_Type_Max_Fields = {
  __typename?: 'heart_data_progress_type_max_fields';
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Heart_Data_Progress_Type_Min_Fields = {
  __typename?: 'heart_data_progress_type_min_fields';
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "heart_data_progress_type" */
export type Heart_Data_Progress_Type_Mutation_Response = {
  __typename?: 'heart_data_progress_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Heart_Data_Progress_Type>;
};

/** on_conflict condition type for table "heart_data_progress_type" */
export type Heart_Data_Progress_Type_On_Conflict = {
  constraint: Heart_Data_Progress_Type_Constraint;
  update_columns?: Array<Heart_Data_Progress_Type_Update_Column>;
  where?: InputMaybe<Heart_Data_Progress_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "heart_data_progress_type". */
export type Heart_Data_Progress_Type_Order_By = {
  description?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: heart_data_progress_type */
export type Heart_Data_Progress_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "heart_data_progress_type" */
export enum Heart_Data_Progress_Type_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "heart_data_progress_type" */
export type Heart_Data_Progress_Type_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "heart_data_progress_type" */
export type Heart_Data_Progress_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Heart_Data_Progress_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Heart_Data_Progress_Type_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "heart_data_progress_type" */
export enum Heart_Data_Progress_Type_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

export type Heart_Data_Progress_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Heart_Data_Progress_Type_Set_Input>;
  /** filter the rows which have to be updated */
  where: Heart_Data_Progress_Type_Bool_Exp;
};

/** select columns of table "heart_data" */
export enum Heart_Data_Select_Column {
  /** column name */
  CreatedOn = 'created_on',
  /** column name */
  Data = 'data',
  /** column name */
  DeletedOn = 'deleted_on',
  /** column name */
  Id = 'id',
  /** column name */
  Owner = 'owner',
  /** column name */
  RecordingLocation = 'recording_location',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title',
  /** column name */
  TrendRecording = 'trend_recording'
}

/** input type for updating data in table "heart_data" */
export type Heart_Data_Set_Input = {
  created_on?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  deleted_on?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner?: InputMaybe<Scalars['String']>;
  recording_location?: InputMaybe<Scalars['jsonb']>;
  status?: InputMaybe<Heart_Data_Progress_Type_Enum>;
  title?: InputMaybe<Scalars['String']>;
  trend_recording?: InputMaybe<Scalars['Boolean']>;
};

/** Streaming cursor of the table "heart_data" */
export type Heart_Data_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Heart_Data_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Heart_Data_Stream_Cursor_Value_Input = {
  created_on?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  deleted_on?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner?: InputMaybe<Scalars['String']>;
  recording_location?: InputMaybe<Scalars['jsonb']>;
  status?: InputMaybe<Heart_Data_Progress_Type_Enum>;
  title?: InputMaybe<Scalars['String']>;
  trend_recording?: InputMaybe<Scalars['Boolean']>;
};

/** columns and relationships of "heart_data_tag" */
export type Heart_Data_Tag = {
  __typename?: 'heart_data_tag';
  heart_data_id: Scalars['uuid'];
  /** An object relationship */
  heart_datum: Heart_Data;
  id: Scalars['bigint'];
  /** An object relationship */
  tag: Tag;
  tag_id: Scalars['bigint'];
};

/** aggregated selection of "heart_data_tag" */
export type Heart_Data_Tag_Aggregate = {
  __typename?: 'heart_data_tag_aggregate';
  aggregate?: Maybe<Heart_Data_Tag_Aggregate_Fields>;
  nodes: Array<Heart_Data_Tag>;
};

export type Heart_Data_Tag_Aggregate_Bool_Exp = {
  count?: InputMaybe<Heart_Data_Tag_Aggregate_Bool_Exp_Count>;
};

export type Heart_Data_Tag_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Heart_Data_Tag_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "heart_data_tag" */
export type Heart_Data_Tag_Aggregate_Fields = {
  __typename?: 'heart_data_tag_aggregate_fields';
  avg?: Maybe<Heart_Data_Tag_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Heart_Data_Tag_Max_Fields>;
  min?: Maybe<Heart_Data_Tag_Min_Fields>;
  stddev?: Maybe<Heart_Data_Tag_Stddev_Fields>;
  stddev_pop?: Maybe<Heart_Data_Tag_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Heart_Data_Tag_Stddev_Samp_Fields>;
  sum?: Maybe<Heart_Data_Tag_Sum_Fields>;
  var_pop?: Maybe<Heart_Data_Tag_Var_Pop_Fields>;
  var_samp?: Maybe<Heart_Data_Tag_Var_Samp_Fields>;
  variance?: Maybe<Heart_Data_Tag_Variance_Fields>;
};


/** aggregate fields of "heart_data_tag" */
export type Heart_Data_Tag_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Heart_Data_Tag_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "heart_data_tag" */
export type Heart_Data_Tag_Aggregate_Order_By = {
  avg?: InputMaybe<Heart_Data_Tag_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Heart_Data_Tag_Max_Order_By>;
  min?: InputMaybe<Heart_Data_Tag_Min_Order_By>;
  stddev?: InputMaybe<Heart_Data_Tag_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Heart_Data_Tag_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Heart_Data_Tag_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Heart_Data_Tag_Sum_Order_By>;
  var_pop?: InputMaybe<Heart_Data_Tag_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Heart_Data_Tag_Var_Samp_Order_By>;
  variance?: InputMaybe<Heart_Data_Tag_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "heart_data_tag" */
export type Heart_Data_Tag_Arr_Rel_Insert_Input = {
  data: Array<Heart_Data_Tag_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Heart_Data_Tag_On_Conflict>;
};

/** aggregate avg on columns */
export type Heart_Data_Tag_Avg_Fields = {
  __typename?: 'heart_data_tag_avg_fields';
  id?: Maybe<Scalars['Float']>;
  tag_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "heart_data_tag" */
export type Heart_Data_Tag_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "heart_data_tag". All fields are combined with a logical 'AND'. */
export type Heart_Data_Tag_Bool_Exp = {
  _and?: InputMaybe<Array<Heart_Data_Tag_Bool_Exp>>;
  _not?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
  _or?: InputMaybe<Array<Heart_Data_Tag_Bool_Exp>>;
  heart_data_id?: InputMaybe<Uuid_Comparison_Exp>;
  heart_datum?: InputMaybe<Heart_Data_Bool_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  tag?: InputMaybe<Tag_Bool_Exp>;
  tag_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "heart_data_tag" */
export enum Heart_Data_Tag_Constraint {
  /** unique or primary key constraint on columns "tag_id", "heart_data_id" */
  HeartDataTagHeartDataIdTagIdKey = 'heart_data_tag_heart_data_id_tag_id_key',
  /** unique or primary key constraint on columns "id" */
  HeartDataTagPkey = 'heart_data_tag_pkey'
}

/** input type for incrementing numeric columns in table "heart_data_tag" */
export type Heart_Data_Tag_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
  tag_id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "heart_data_tag" */
export type Heart_Data_Tag_Insert_Input = {
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  heart_datum?: InputMaybe<Heart_Data_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['bigint']>;
  tag?: InputMaybe<Tag_Obj_Rel_Insert_Input>;
  tag_id?: InputMaybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type Heart_Data_Tag_Max_Fields = {
  __typename?: 'heart_data_tag_max_fields';
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['bigint']>;
  tag_id?: Maybe<Scalars['bigint']>;
};

/** order by max() on columns of table "heart_data_tag" */
export type Heart_Data_Tag_Max_Order_By = {
  heart_data_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Heart_Data_Tag_Min_Fields = {
  __typename?: 'heart_data_tag_min_fields';
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['bigint']>;
  tag_id?: Maybe<Scalars['bigint']>;
};

/** order by min() on columns of table "heart_data_tag" */
export type Heart_Data_Tag_Min_Order_By = {
  heart_data_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "heart_data_tag" */
export type Heart_Data_Tag_Mutation_Response = {
  __typename?: 'heart_data_tag_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Heart_Data_Tag>;
};

/** on_conflict condition type for table "heart_data_tag" */
export type Heart_Data_Tag_On_Conflict = {
  constraint: Heart_Data_Tag_Constraint;
  update_columns?: Array<Heart_Data_Tag_Update_Column>;
  where?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
};

/** Ordering options when selecting data from "heart_data_tag". */
export type Heart_Data_Tag_Order_By = {
  heart_data_id?: InputMaybe<Order_By>;
  heart_datum?: InputMaybe<Heart_Data_Order_By>;
  id?: InputMaybe<Order_By>;
  tag?: InputMaybe<Tag_Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: heart_data_tag */
export type Heart_Data_Tag_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "heart_data_tag" */
export enum Heart_Data_Tag_Select_Column {
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  TagId = 'tag_id'
}

/** input type for updating data in table "heart_data_tag" */
export type Heart_Data_Tag_Set_Input = {
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  tag_id?: InputMaybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type Heart_Data_Tag_Stddev_Fields = {
  __typename?: 'heart_data_tag_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  tag_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "heart_data_tag" */
export type Heart_Data_Tag_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Heart_Data_Tag_Stddev_Pop_Fields = {
  __typename?: 'heart_data_tag_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  tag_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "heart_data_tag" */
export type Heart_Data_Tag_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Heart_Data_Tag_Stddev_Samp_Fields = {
  __typename?: 'heart_data_tag_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  tag_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "heart_data_tag" */
export type Heart_Data_Tag_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "heart_data_tag" */
export type Heart_Data_Tag_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Heart_Data_Tag_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Heart_Data_Tag_Stream_Cursor_Value_Input = {
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  tag_id?: InputMaybe<Scalars['bigint']>;
};

/** aggregate sum on columns */
export type Heart_Data_Tag_Sum_Fields = {
  __typename?: 'heart_data_tag_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  tag_id?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "heart_data_tag" */
export type Heart_Data_Tag_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** update columns of table "heart_data_tag" */
export enum Heart_Data_Tag_Update_Column {
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  TagId = 'tag_id'
}

export type Heart_Data_Tag_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Heart_Data_Tag_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Heart_Data_Tag_Set_Input>;
  /** filter the rows which have to be updated */
  where: Heart_Data_Tag_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Heart_Data_Tag_Var_Pop_Fields = {
  __typename?: 'heart_data_tag_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  tag_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "heart_data_tag" */
export type Heart_Data_Tag_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Heart_Data_Tag_Var_Samp_Fields = {
  __typename?: 'heart_data_tag_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  tag_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "heart_data_tag" */
export type Heart_Data_Tag_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Heart_Data_Tag_Variance_Fields = {
  __typename?: 'heart_data_tag_variance_fields';
  id?: Maybe<Scalars['Float']>;
  tag_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "heart_data_tag" */
export type Heart_Data_Tag_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** update columns of table "heart_data" */
export enum Heart_Data_Update_Column {
  /** column name */
  CreatedOn = 'created_on',
  /** column name */
  Data = 'data',
  /** column name */
  DeletedOn = 'deleted_on',
  /** column name */
  Id = 'id',
  /** column name */
  Owner = 'owner',
  /** column name */
  RecordingLocation = 'recording_location',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title',
  /** column name */
  TrendRecording = 'trend_recording'
}

export type Heart_Data_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Heart_Data_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Heart_Data_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Heart_Data_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Heart_Data_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Heart_Data_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Heart_Data_Set_Input>;
  /** filter the rows which have to be updated */
  where: Heart_Data_Bool_Exp;
};

/** columns and relationships of "identities" */
export type Identities = {
  __typename?: 'identities';
  breached_password_last_checked_instant?: Maybe<Scalars['bigint']>;
  breached_password_status?: Maybe<Scalars['smallint']>;
  connectors_id: Scalars['uuid'];
  email?: Maybe<Scalars['String']>;
  encryption_scheme: Scalars['String'];
  factor: Scalars['Int'];
  id: Scalars['bigint'];
  insert_instant: Scalars['bigint'];
  last_login_instant?: Maybe<Scalars['bigint']>;
  last_update_instant: Scalars['bigint'];
  password: Scalars['String'];
  password_change_reason?: Maybe<Scalars['smallint']>;
  password_change_required: Scalars['Boolean'];
  password_last_update_instant: Scalars['bigint'];
  salt: Scalars['String'];
  status: Scalars['smallint'];
  tenants_id: Scalars['uuid'];
  /** An object relationship */
  user: Users;
  username?: Maybe<Scalars['String']>;
  username_index?: Maybe<Scalars['String']>;
  username_status: Scalars['smallint'];
  users_id: Scalars['uuid'];
  verified: Scalars['Boolean'];
};

/** aggregated selection of "identities" */
export type Identities_Aggregate = {
  __typename?: 'identities_aggregate';
  aggregate?: Maybe<Identities_Aggregate_Fields>;
  nodes: Array<Identities>;
};

export type Identities_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Identities_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Identities_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Identities_Aggregate_Bool_Exp_Count>;
};

export type Identities_Aggregate_Bool_Exp_Bool_And = {
  arguments: Identities_Select_Column_Identities_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Identities_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Identities_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Identities_Select_Column_Identities_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Identities_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Identities_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Identities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Identities_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "identities" */
export type Identities_Aggregate_Fields = {
  __typename?: 'identities_aggregate_fields';
  avg?: Maybe<Identities_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Identities_Max_Fields>;
  min?: Maybe<Identities_Min_Fields>;
  stddev?: Maybe<Identities_Stddev_Fields>;
  stddev_pop?: Maybe<Identities_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Identities_Stddev_Samp_Fields>;
  sum?: Maybe<Identities_Sum_Fields>;
  var_pop?: Maybe<Identities_Var_Pop_Fields>;
  var_samp?: Maybe<Identities_Var_Samp_Fields>;
  variance?: Maybe<Identities_Variance_Fields>;
};


/** aggregate fields of "identities" */
export type Identities_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Identities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "identities" */
export type Identities_Aggregate_Order_By = {
  avg?: InputMaybe<Identities_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Identities_Max_Order_By>;
  min?: InputMaybe<Identities_Min_Order_By>;
  stddev?: InputMaybe<Identities_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Identities_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Identities_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Identities_Sum_Order_By>;
  var_pop?: InputMaybe<Identities_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Identities_Var_Samp_Order_By>;
  variance?: InputMaybe<Identities_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "identities" */
export type Identities_Arr_Rel_Insert_Input = {
  data: Array<Identities_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Identities_On_Conflict>;
};

/** aggregate avg on columns */
export type Identities_Avg_Fields = {
  __typename?: 'identities_avg_fields';
  breached_password_last_checked_instant?: Maybe<Scalars['Float']>;
  breached_password_status?: Maybe<Scalars['Float']>;
  factor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_login_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
  password_change_reason?: Maybe<Scalars['Float']>;
  password_last_update_instant?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
  username_status?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "identities" */
export type Identities_Avg_Order_By = {
  breached_password_last_checked_instant?: InputMaybe<Order_By>;
  breached_password_status?: InputMaybe<Order_By>;
  factor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_login_instant?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  password_change_reason?: InputMaybe<Order_By>;
  password_last_update_instant?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  username_status?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "identities". All fields are combined with a logical 'AND'. */
export type Identities_Bool_Exp = {
  _and?: InputMaybe<Array<Identities_Bool_Exp>>;
  _not?: InputMaybe<Identities_Bool_Exp>;
  _or?: InputMaybe<Array<Identities_Bool_Exp>>;
  breached_password_last_checked_instant?: InputMaybe<Bigint_Comparison_Exp>;
  breached_password_status?: InputMaybe<Smallint_Comparison_Exp>;
  connectors_id?: InputMaybe<Uuid_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  encryption_scheme?: InputMaybe<String_Comparison_Exp>;
  factor?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  insert_instant?: InputMaybe<Bigint_Comparison_Exp>;
  last_login_instant?: InputMaybe<Bigint_Comparison_Exp>;
  last_update_instant?: InputMaybe<Bigint_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  password_change_reason?: InputMaybe<Smallint_Comparison_Exp>;
  password_change_required?: InputMaybe<Boolean_Comparison_Exp>;
  password_last_update_instant?: InputMaybe<Bigint_Comparison_Exp>;
  salt?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<Smallint_Comparison_Exp>;
  tenants_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
  username_index?: InputMaybe<String_Comparison_Exp>;
  username_status?: InputMaybe<Smallint_Comparison_Exp>;
  users_id?: InputMaybe<Uuid_Comparison_Exp>;
  verified?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "identities" */
export enum Identities_Constraint {
  /** unique or primary key constraint on columns "id" */
  IdentitiesPkey = 'identities_pkey',
  /** unique or primary key constraint on columns "tenants_id", "email" */
  IdentitiesUk_1 = 'identities_uk_1',
  /** unique or primary key constraint on columns "username_index", "tenants_id" */
  IdentitiesUk_2 = 'identities_uk_2'
}

/** input type for incrementing numeric columns in table "identities" */
export type Identities_Inc_Input = {
  breached_password_last_checked_instant?: InputMaybe<Scalars['bigint']>;
  breached_password_status?: InputMaybe<Scalars['smallint']>;
  factor?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['bigint']>;
  insert_instant?: InputMaybe<Scalars['bigint']>;
  last_login_instant?: InputMaybe<Scalars['bigint']>;
  last_update_instant?: InputMaybe<Scalars['bigint']>;
  password_change_reason?: InputMaybe<Scalars['smallint']>;
  password_last_update_instant?: InputMaybe<Scalars['bigint']>;
  status?: InputMaybe<Scalars['smallint']>;
  username_status?: InputMaybe<Scalars['smallint']>;
};

/** input type for inserting data into table "identities" */
export type Identities_Insert_Input = {
  breached_password_last_checked_instant?: InputMaybe<Scalars['bigint']>;
  breached_password_status?: InputMaybe<Scalars['smallint']>;
  connectors_id?: InputMaybe<Scalars['uuid']>;
  email?: InputMaybe<Scalars['String']>;
  encryption_scheme?: InputMaybe<Scalars['String']>;
  factor?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['bigint']>;
  insert_instant?: InputMaybe<Scalars['bigint']>;
  last_login_instant?: InputMaybe<Scalars['bigint']>;
  last_update_instant?: InputMaybe<Scalars['bigint']>;
  password?: InputMaybe<Scalars['String']>;
  password_change_reason?: InputMaybe<Scalars['smallint']>;
  password_change_required?: InputMaybe<Scalars['Boolean']>;
  password_last_update_instant?: InputMaybe<Scalars['bigint']>;
  salt?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['smallint']>;
  tenants_id?: InputMaybe<Scalars['uuid']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  username?: InputMaybe<Scalars['String']>;
  username_index?: InputMaybe<Scalars['String']>;
  username_status?: InputMaybe<Scalars['smallint']>;
  users_id?: InputMaybe<Scalars['uuid']>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Identities_Max_Fields = {
  __typename?: 'identities_max_fields';
  breached_password_last_checked_instant?: Maybe<Scalars['bigint']>;
  breached_password_status?: Maybe<Scalars['smallint']>;
  connectors_id?: Maybe<Scalars['uuid']>;
  email?: Maybe<Scalars['String']>;
  encryption_scheme?: Maybe<Scalars['String']>;
  factor?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['bigint']>;
  insert_instant?: Maybe<Scalars['bigint']>;
  last_login_instant?: Maybe<Scalars['bigint']>;
  last_update_instant?: Maybe<Scalars['bigint']>;
  password?: Maybe<Scalars['String']>;
  password_change_reason?: Maybe<Scalars['smallint']>;
  password_last_update_instant?: Maybe<Scalars['bigint']>;
  salt?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['smallint']>;
  tenants_id?: Maybe<Scalars['uuid']>;
  username?: Maybe<Scalars['String']>;
  username_index?: Maybe<Scalars['String']>;
  username_status?: Maybe<Scalars['smallint']>;
  users_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "identities" */
export type Identities_Max_Order_By = {
  breached_password_last_checked_instant?: InputMaybe<Order_By>;
  breached_password_status?: InputMaybe<Order_By>;
  connectors_id?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  encryption_scheme?: InputMaybe<Order_By>;
  factor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_login_instant?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  password_change_reason?: InputMaybe<Order_By>;
  password_last_update_instant?: InputMaybe<Order_By>;
  salt?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tenants_id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  username_index?: InputMaybe<Order_By>;
  username_status?: InputMaybe<Order_By>;
  users_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Identities_Min_Fields = {
  __typename?: 'identities_min_fields';
  breached_password_last_checked_instant?: Maybe<Scalars['bigint']>;
  breached_password_status?: Maybe<Scalars['smallint']>;
  connectors_id?: Maybe<Scalars['uuid']>;
  email?: Maybe<Scalars['String']>;
  encryption_scheme?: Maybe<Scalars['String']>;
  factor?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['bigint']>;
  insert_instant?: Maybe<Scalars['bigint']>;
  last_login_instant?: Maybe<Scalars['bigint']>;
  last_update_instant?: Maybe<Scalars['bigint']>;
  password?: Maybe<Scalars['String']>;
  password_change_reason?: Maybe<Scalars['smallint']>;
  password_last_update_instant?: Maybe<Scalars['bigint']>;
  salt?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['smallint']>;
  tenants_id?: Maybe<Scalars['uuid']>;
  username?: Maybe<Scalars['String']>;
  username_index?: Maybe<Scalars['String']>;
  username_status?: Maybe<Scalars['smallint']>;
  users_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "identities" */
export type Identities_Min_Order_By = {
  breached_password_last_checked_instant?: InputMaybe<Order_By>;
  breached_password_status?: InputMaybe<Order_By>;
  connectors_id?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  encryption_scheme?: InputMaybe<Order_By>;
  factor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_login_instant?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  password_change_reason?: InputMaybe<Order_By>;
  password_last_update_instant?: InputMaybe<Order_By>;
  salt?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tenants_id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  username_index?: InputMaybe<Order_By>;
  username_status?: InputMaybe<Order_By>;
  users_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "identities" */
export type Identities_Mutation_Response = {
  __typename?: 'identities_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Identities>;
};

/** on_conflict condition type for table "identities" */
export type Identities_On_Conflict = {
  constraint: Identities_Constraint;
  update_columns?: Array<Identities_Update_Column>;
  where?: InputMaybe<Identities_Bool_Exp>;
};

/** Ordering options when selecting data from "identities". */
export type Identities_Order_By = {
  breached_password_last_checked_instant?: InputMaybe<Order_By>;
  breached_password_status?: InputMaybe<Order_By>;
  connectors_id?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  encryption_scheme?: InputMaybe<Order_By>;
  factor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_login_instant?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  password_change_reason?: InputMaybe<Order_By>;
  password_change_required?: InputMaybe<Order_By>;
  password_last_update_instant?: InputMaybe<Order_By>;
  salt?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tenants_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  username?: InputMaybe<Order_By>;
  username_index?: InputMaybe<Order_By>;
  username_status?: InputMaybe<Order_By>;
  users_id?: InputMaybe<Order_By>;
  verified?: InputMaybe<Order_By>;
};

/** primary key columns input for table: identities */
export type Identities_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "identities" */
export enum Identities_Select_Column {
  /** column name */
  BreachedPasswordLastCheckedInstant = 'breached_password_last_checked_instant',
  /** column name */
  BreachedPasswordStatus = 'breached_password_status',
  /** column name */
  ConnectorsId = 'connectors_id',
  /** column name */
  Email = 'email',
  /** column name */
  EncryptionScheme = 'encryption_scheme',
  /** column name */
  Factor = 'factor',
  /** column name */
  Id = 'id',
  /** column name */
  InsertInstant = 'insert_instant',
  /** column name */
  LastLoginInstant = 'last_login_instant',
  /** column name */
  LastUpdateInstant = 'last_update_instant',
  /** column name */
  Password = 'password',
  /** column name */
  PasswordChangeReason = 'password_change_reason',
  /** column name */
  PasswordChangeRequired = 'password_change_required',
  /** column name */
  PasswordLastUpdateInstant = 'password_last_update_instant',
  /** column name */
  Salt = 'salt',
  /** column name */
  Status = 'status',
  /** column name */
  TenantsId = 'tenants_id',
  /** column name */
  Username = 'username',
  /** column name */
  UsernameIndex = 'username_index',
  /** column name */
  UsernameStatus = 'username_status',
  /** column name */
  UsersId = 'users_id',
  /** column name */
  Verified = 'verified'
}

/** select "identities_aggregate_bool_exp_bool_and_arguments_columns" columns of table "identities" */
export enum Identities_Select_Column_Identities_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  PasswordChangeRequired = 'password_change_required',
  /** column name */
  Verified = 'verified'
}

/** select "identities_aggregate_bool_exp_bool_or_arguments_columns" columns of table "identities" */
export enum Identities_Select_Column_Identities_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  PasswordChangeRequired = 'password_change_required',
  /** column name */
  Verified = 'verified'
}

/** input type for updating data in table "identities" */
export type Identities_Set_Input = {
  breached_password_last_checked_instant?: InputMaybe<Scalars['bigint']>;
  breached_password_status?: InputMaybe<Scalars['smallint']>;
  connectors_id?: InputMaybe<Scalars['uuid']>;
  email?: InputMaybe<Scalars['String']>;
  encryption_scheme?: InputMaybe<Scalars['String']>;
  factor?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['bigint']>;
  insert_instant?: InputMaybe<Scalars['bigint']>;
  last_login_instant?: InputMaybe<Scalars['bigint']>;
  last_update_instant?: InputMaybe<Scalars['bigint']>;
  password?: InputMaybe<Scalars['String']>;
  password_change_reason?: InputMaybe<Scalars['smallint']>;
  password_change_required?: InputMaybe<Scalars['Boolean']>;
  password_last_update_instant?: InputMaybe<Scalars['bigint']>;
  salt?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['smallint']>;
  tenants_id?: InputMaybe<Scalars['uuid']>;
  username?: InputMaybe<Scalars['String']>;
  username_index?: InputMaybe<Scalars['String']>;
  username_status?: InputMaybe<Scalars['smallint']>;
  users_id?: InputMaybe<Scalars['uuid']>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate stddev on columns */
export type Identities_Stddev_Fields = {
  __typename?: 'identities_stddev_fields';
  breached_password_last_checked_instant?: Maybe<Scalars['Float']>;
  breached_password_status?: Maybe<Scalars['Float']>;
  factor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_login_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
  password_change_reason?: Maybe<Scalars['Float']>;
  password_last_update_instant?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
  username_status?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "identities" */
export type Identities_Stddev_Order_By = {
  breached_password_last_checked_instant?: InputMaybe<Order_By>;
  breached_password_status?: InputMaybe<Order_By>;
  factor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_login_instant?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  password_change_reason?: InputMaybe<Order_By>;
  password_last_update_instant?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  username_status?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Identities_Stddev_Pop_Fields = {
  __typename?: 'identities_stddev_pop_fields';
  breached_password_last_checked_instant?: Maybe<Scalars['Float']>;
  breached_password_status?: Maybe<Scalars['Float']>;
  factor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_login_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
  password_change_reason?: Maybe<Scalars['Float']>;
  password_last_update_instant?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
  username_status?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "identities" */
export type Identities_Stddev_Pop_Order_By = {
  breached_password_last_checked_instant?: InputMaybe<Order_By>;
  breached_password_status?: InputMaybe<Order_By>;
  factor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_login_instant?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  password_change_reason?: InputMaybe<Order_By>;
  password_last_update_instant?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  username_status?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Identities_Stddev_Samp_Fields = {
  __typename?: 'identities_stddev_samp_fields';
  breached_password_last_checked_instant?: Maybe<Scalars['Float']>;
  breached_password_status?: Maybe<Scalars['Float']>;
  factor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_login_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
  password_change_reason?: Maybe<Scalars['Float']>;
  password_last_update_instant?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
  username_status?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "identities" */
export type Identities_Stddev_Samp_Order_By = {
  breached_password_last_checked_instant?: InputMaybe<Order_By>;
  breached_password_status?: InputMaybe<Order_By>;
  factor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_login_instant?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  password_change_reason?: InputMaybe<Order_By>;
  password_last_update_instant?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  username_status?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "identities" */
export type Identities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Identities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Identities_Stream_Cursor_Value_Input = {
  breached_password_last_checked_instant?: InputMaybe<Scalars['bigint']>;
  breached_password_status?: InputMaybe<Scalars['smallint']>;
  connectors_id?: InputMaybe<Scalars['uuid']>;
  email?: InputMaybe<Scalars['String']>;
  encryption_scheme?: InputMaybe<Scalars['String']>;
  factor?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['bigint']>;
  insert_instant?: InputMaybe<Scalars['bigint']>;
  last_login_instant?: InputMaybe<Scalars['bigint']>;
  last_update_instant?: InputMaybe<Scalars['bigint']>;
  password?: InputMaybe<Scalars['String']>;
  password_change_reason?: InputMaybe<Scalars['smallint']>;
  password_change_required?: InputMaybe<Scalars['Boolean']>;
  password_last_update_instant?: InputMaybe<Scalars['bigint']>;
  salt?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['smallint']>;
  tenants_id?: InputMaybe<Scalars['uuid']>;
  username?: InputMaybe<Scalars['String']>;
  username_index?: InputMaybe<Scalars['String']>;
  username_status?: InputMaybe<Scalars['smallint']>;
  users_id?: InputMaybe<Scalars['uuid']>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate sum on columns */
export type Identities_Sum_Fields = {
  __typename?: 'identities_sum_fields';
  breached_password_last_checked_instant?: Maybe<Scalars['bigint']>;
  breached_password_status?: Maybe<Scalars['smallint']>;
  factor?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['bigint']>;
  insert_instant?: Maybe<Scalars['bigint']>;
  last_login_instant?: Maybe<Scalars['bigint']>;
  last_update_instant?: Maybe<Scalars['bigint']>;
  password_change_reason?: Maybe<Scalars['smallint']>;
  password_last_update_instant?: Maybe<Scalars['bigint']>;
  status?: Maybe<Scalars['smallint']>;
  username_status?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "identities" */
export type Identities_Sum_Order_By = {
  breached_password_last_checked_instant?: InputMaybe<Order_By>;
  breached_password_status?: InputMaybe<Order_By>;
  factor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_login_instant?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  password_change_reason?: InputMaybe<Order_By>;
  password_last_update_instant?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  username_status?: InputMaybe<Order_By>;
};

/** update columns of table "identities" */
export enum Identities_Update_Column {
  /** column name */
  BreachedPasswordLastCheckedInstant = 'breached_password_last_checked_instant',
  /** column name */
  BreachedPasswordStatus = 'breached_password_status',
  /** column name */
  ConnectorsId = 'connectors_id',
  /** column name */
  Email = 'email',
  /** column name */
  EncryptionScheme = 'encryption_scheme',
  /** column name */
  Factor = 'factor',
  /** column name */
  Id = 'id',
  /** column name */
  InsertInstant = 'insert_instant',
  /** column name */
  LastLoginInstant = 'last_login_instant',
  /** column name */
  LastUpdateInstant = 'last_update_instant',
  /** column name */
  Password = 'password',
  /** column name */
  PasswordChangeReason = 'password_change_reason',
  /** column name */
  PasswordChangeRequired = 'password_change_required',
  /** column name */
  PasswordLastUpdateInstant = 'password_last_update_instant',
  /** column name */
  Salt = 'salt',
  /** column name */
  Status = 'status',
  /** column name */
  TenantsId = 'tenants_id',
  /** column name */
  Username = 'username',
  /** column name */
  UsernameIndex = 'username_index',
  /** column name */
  UsernameStatus = 'username_status',
  /** column name */
  UsersId = 'users_id',
  /** column name */
  Verified = 'verified'
}

export type Identities_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Identities_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Identities_Set_Input>;
  /** filter the rows which have to be updated */
  where: Identities_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Identities_Var_Pop_Fields = {
  __typename?: 'identities_var_pop_fields';
  breached_password_last_checked_instant?: Maybe<Scalars['Float']>;
  breached_password_status?: Maybe<Scalars['Float']>;
  factor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_login_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
  password_change_reason?: Maybe<Scalars['Float']>;
  password_last_update_instant?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
  username_status?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "identities" */
export type Identities_Var_Pop_Order_By = {
  breached_password_last_checked_instant?: InputMaybe<Order_By>;
  breached_password_status?: InputMaybe<Order_By>;
  factor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_login_instant?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  password_change_reason?: InputMaybe<Order_By>;
  password_last_update_instant?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  username_status?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Identities_Var_Samp_Fields = {
  __typename?: 'identities_var_samp_fields';
  breached_password_last_checked_instant?: Maybe<Scalars['Float']>;
  breached_password_status?: Maybe<Scalars['Float']>;
  factor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_login_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
  password_change_reason?: Maybe<Scalars['Float']>;
  password_last_update_instant?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
  username_status?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "identities" */
export type Identities_Var_Samp_Order_By = {
  breached_password_last_checked_instant?: InputMaybe<Order_By>;
  breached_password_status?: InputMaybe<Order_By>;
  factor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_login_instant?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  password_change_reason?: InputMaybe<Order_By>;
  password_last_update_instant?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  username_status?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Identities_Variance_Fields = {
  __typename?: 'identities_variance_fields';
  breached_password_last_checked_instant?: Maybe<Scalars['Float']>;
  breached_password_status?: Maybe<Scalars['Float']>;
  factor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_login_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
  password_change_reason?: Maybe<Scalars['Float']>;
  password_last_update_instant?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
  username_status?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "identities" */
export type Identities_Variance_Order_By = {
  breached_password_last_checked_instant?: InputMaybe<Order_By>;
  breached_password_status?: InputMaybe<Order_By>;
  factor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_login_instant?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  password_change_reason?: InputMaybe<Order_By>;
  password_last_update_instant?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  username_status?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "inet". All fields are combined with logical 'AND'. */
export type Inet_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['inet']>;
  _gt?: InputMaybe<Scalars['inet']>;
  _gte?: InputMaybe<Scalars['inet']>;
  _in?: InputMaybe<Array<Scalars['inet']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['inet']>;
  _lte?: InputMaybe<Scalars['inet']>;
  _neq?: InputMaybe<Scalars['inet']>;
  _nin?: InputMaybe<Array<Scalars['inet']>>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

export type Match = {
  __typename?: 'match';
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  explanation?: Maybe<Explanation>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  max?: Maybe<Scalars['Float']>;
  max_age?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  min_age?: Maybe<Scalars['Float']>;
  refKey?: Maybe<Values>;
  status?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type MatchExplanationArgs = {
  filter?: InputMaybe<Explanation_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MatchRefKeyArgs = {
  filter?: InputMaybe<Values_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MatchUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MatchUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Match_Aggregated = {
  __typename?: 'match_aggregated';
  avg?: Maybe<Match_Aggregated_Fields>;
  avgDistinct?: Maybe<Match_Aggregated_Fields>;
  count?: Maybe<Match_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Match_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Match_Aggregated_Fields>;
  min?: Maybe<Match_Aggregated_Fields>;
  sum?: Maybe<Match_Aggregated_Fields>;
  sumDistinct?: Maybe<Match_Aggregated_Fields>;
};

export type Match_Aggregated_Count = {
  __typename?: 'match_aggregated_count';
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  explanation?: Maybe<Scalars['Int']>;
  gender?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max?: Maybe<Scalars['Int']>;
  max_age?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  min_age?: Maybe<Scalars['Int']>;
  refKey?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Match_Aggregated_Fields = {
  __typename?: 'match_aggregated_fields';
  explanation?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  max_age?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  min_age?: Maybe<Scalars['Float']>;
};

export type Match_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Match_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Match_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  explanation?: InputMaybe<Explanation_Filter>;
  gender?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  max?: InputMaybe<Number_Filter_Operators>;
  max_age?: InputMaybe<Number_Filter_Operators>;
  min?: InputMaybe<Number_Filter_Operators>;
  min_age?: InputMaybe<Number_Filter_Operators>;
  refKey?: InputMaybe<Values_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Match_Mutated = {
  __typename?: 'match_mutated';
  data?: Maybe<Match>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** Patch user details */
  PatchUser?: Maybe<PatchUserOutput>;
  create_BG_Raw_Scores_item?: Maybe<Bg_Raw_Scores>;
  create_BG_Raw_Scores_items: Array<Bg_Raw_Scores>;
  create_Disclaimer_Acknowledgement_item?: Maybe<Disclaimer_Acknowledgement>;
  create_Disclaimer_Acknowledgement_items: Array<Disclaimer_Acknowledgement>;
  create_Disclaimers_item?: Maybe<Disclaimers>;
  create_Disclaimers_items: Array<Disclaimers>;
  create_Feature_Requests_item?: Maybe<Feature_Requests>;
  create_Feature_Requests_items: Array<Feature_Requests>;
  create_Gradient_Colour_item?: Maybe<Gradient_Colour>;
  create_Gradient_Colour_items: Array<Gradient_Colour>;
  create_Repeat_Colour_item?: Maybe<Repeat_Colour>;
  create_Repeat_Colour_items: Array<Repeat_Colour>;
  create_Solution_Category_item?: Maybe<Solution_Category>;
  create_Solution_Category_items: Array<Solution_Category>;
  create_Solution_item?: Maybe<Solution>;
  create_Solution_items: Array<Solution>;
  create_answer_group_item?: Maybe<Answer_Group>;
  create_answer_group_items: Array<Answer_Group>;
  create_answer_item?: Maybe<Answer>;
  create_answer_items: Array<Answer>;
  create_answer_set_item?: Maybe<Answer_Set>;
  create_answer_set_items: Array<Answer_Set>;
  create_bar_gradients_Gradient_Colour_item?: Maybe<Bar_Gradients_Gradient_Colour>;
  create_bar_gradients_Gradient_Colour_items: Array<Bar_Gradients_Gradient_Colour>;
  create_bar_gradients_item?: Maybe<Bar_Gradients>;
  create_bar_gradients_items: Array<Bar_Gradients>;
  create_bg_parameters_item?: Maybe<Bg_Parameters>;
  create_bg_parameters_items: Array<Bg_Parameters>;
  create_descriptions_item?: Maybe<Descriptions>;
  create_descriptions_items: Array<Descriptions>;
  create_explanation_item?: Maybe<Explanation>;
  create_explanation_items: Array<Explanation>;
  create_global_notifications_item?: Maybe<Global_Notifications>;
  create_global_notifications_items: Array<Global_Notifications>;
  create_match_item?: Maybe<Match>;
  create_match_items: Array<Match>;
  create_option_group_item?: Maybe<Option_Group>;
  create_option_group_items: Array<Option_Group>;
  create_option_item?: Maybe<Option>;
  create_option_items: Array<Option>;
  create_question_item?: Maybe<Question>;
  create_question_items: Array<Question>;
  create_question_set_item?: Maybe<Question_Set>;
  create_question_set_items: Array<Question_Set>;
  create_questionnaire_conclusion_item?: Maybe<Questionnaire_Conclusion>;
  create_questionnaire_conclusion_items: Array<Questionnaire_Conclusion>;
  create_questionnaire_item?: Maybe<Questionnaire>;
  create_questionnaire_items: Array<Questionnaire>;
  create_questionnaire_question_set_item?: Maybe<Questionnaire_Question_Set>;
  create_questionnaire_question_set_items: Array<Questionnaire_Question_Set>;
  create_tutorials_item?: Maybe<Tutorials>;
  create_tutorials_items: Array<Tutorials>;
  create_values_item?: Maybe<Values>;
  create_values_items: Array<Values>;
  delete_BG_Raw_Scores_item?: Maybe<Delete_One>;
  delete_BG_Raw_Scores_items?: Maybe<Delete_Many>;
  delete_Disclaimer_Acknowledgement_item?: Maybe<Delete_One>;
  delete_Disclaimer_Acknowledgement_items?: Maybe<Delete_Many>;
  delete_Disclaimers_item?: Maybe<Delete_One>;
  delete_Disclaimers_items?: Maybe<Delete_Many>;
  delete_Feature_Requests_item?: Maybe<Delete_One>;
  delete_Feature_Requests_items?: Maybe<Delete_Many>;
  delete_Gradient_Colour_item?: Maybe<Delete_One>;
  delete_Gradient_Colour_items?: Maybe<Delete_Many>;
  delete_Repeat_Colour_item?: Maybe<Delete_One>;
  delete_Repeat_Colour_items?: Maybe<Delete_Many>;
  delete_Solution_Category_item?: Maybe<Delete_One>;
  delete_Solution_Category_items?: Maybe<Delete_Many>;
  delete_Solution_item?: Maybe<Delete_One>;
  delete_Solution_items?: Maybe<Delete_Many>;
  /** delete data from the table: "adrenal_function_urine_test" */
  delete_adrenal_function_urine_test?: Maybe<Adrenal_Function_Urine_Test_Mutation_Response>;
  /** delete single row from the table: "adrenal_function_urine_test" */
  delete_adrenal_function_urine_test_by_pk?: Maybe<Adrenal_Function_Urine_Test>;
  delete_answer_group_item?: Maybe<Delete_One>;
  delete_answer_group_items?: Maybe<Delete_Many>;
  delete_answer_item?: Maybe<Delete_One>;
  delete_answer_items?: Maybe<Delete_Many>;
  delete_answer_set_item?: Maybe<Delete_One>;
  delete_answer_set_items?: Maybe<Delete_Many>;
  delete_bar_gradients_Gradient_Colour_item?: Maybe<Delete_One>;
  delete_bar_gradients_Gradient_Colour_items?: Maybe<Delete_Many>;
  delete_bar_gradients_item?: Maybe<Delete_One>;
  delete_bar_gradients_items?: Maybe<Delete_Many>;
  delete_bg_parameters_item?: Maybe<Delete_One>;
  delete_bg_parameters_items?: Maybe<Delete_Many>;
  /** delete data from the table: "brain_spectrum" */
  delete_brain_spectrum?: Maybe<Brain_Spectrum_Mutation_Response>;
  /** delete single row from the table: "brain_spectrum" */
  delete_brain_spectrum_by_pk?: Maybe<Brain_Spectrum>;
  delete_descriptions_item?: Maybe<Delete_One>;
  delete_descriptions_items?: Maybe<Delete_Many>;
  /** delete data from the table: "device" */
  delete_device?: Maybe<Device_Mutation_Response>;
  /** delete data from the table: "device_assignment" */
  delete_device_assignment?: Maybe<Device_Assignment_Mutation_Response>;
  /** delete single row from the table: "device_assignment" */
  delete_device_assignment_by_pk?: Maybe<Device_Assignment>;
  /** delete single row from the table: "device" */
  delete_device_by_pk?: Maybe<Device>;
  /** delete data from the table: "device_location" */
  delete_device_location?: Maybe<Device_Location_Mutation_Response>;
  /** delete single row from the table: "device_location" */
  delete_device_location_by_pk?: Maybe<Device_Location>;
  /** delete data from the table: "device_usage" */
  delete_device_usage?: Maybe<Device_Usage_Mutation_Response>;
  /** delete single row from the table: "device_usage" */
  delete_device_usage_by_pk?: Maybe<Device_Usage>;
  /** delete data from the table: "ecg_files" */
  delete_ecg_files?: Maybe<Ecg_Files_Mutation_Response>;
  /** delete single row from the table: "ecg_files" */
  delete_ecg_files_by_pk?: Maybe<Ecg_Files>;
  delete_explanation_item?: Maybe<Delete_One>;
  delete_explanation_items?: Maybe<Delete_Many>;
  /** delete data from the table: "followers" */
  delete_followers?: Maybe<Followers_Mutation_Response>;
  /** delete single row from the table: "followers" */
  delete_followers_by_pk?: Maybe<Followers>;
  delete_global_notifications_item?: Maybe<Delete_One>;
  delete_global_notifications_items?: Maybe<Delete_Many>;
  /** delete data from the table: "heart_data" */
  delete_heart_data?: Maybe<Heart_Data_Mutation_Response>;
  /** delete single row from the table: "heart_data" */
  delete_heart_data_by_pk?: Maybe<Heart_Data>;
  /** delete data from the table: "heart_data_progress_type" */
  delete_heart_data_progress_type?: Maybe<Heart_Data_Progress_Type_Mutation_Response>;
  /** delete single row from the table: "heart_data_progress_type" */
  delete_heart_data_progress_type_by_pk?: Maybe<Heart_Data_Progress_Type>;
  /** delete data from the table: "heart_data_tag" */
  delete_heart_data_tag?: Maybe<Heart_Data_Tag_Mutation_Response>;
  /** delete single row from the table: "heart_data_tag" */
  delete_heart_data_tag_by_pk?: Maybe<Heart_Data_Tag>;
  /** delete data from the table: "identities" */
  delete_identities?: Maybe<Identities_Mutation_Response>;
  /** delete single row from the table: "identities" */
  delete_identities_by_pk?: Maybe<Identities>;
  delete_match_item?: Maybe<Delete_One>;
  delete_match_items?: Maybe<Delete_Many>;
  /** delete data from the table: "note" */
  delete_note?: Maybe<Note_Mutation_Response>;
  /** delete single row from the table: "note" */
  delete_note_by_pk?: Maybe<Note>;
  delete_option_group_item?: Maybe<Delete_One>;
  delete_option_group_items?: Maybe<Delete_Many>;
  delete_option_item?: Maybe<Delete_One>;
  delete_option_items?: Maybe<Delete_Many>;
  /** delete data from the table: "oxidative_stress_test" */
  delete_oxidative_stress_test?: Maybe<Oxidative_Stress_Test_Mutation_Response>;
  /** delete single row from the table: "oxidative_stress_test" */
  delete_oxidative_stress_test_by_pk?: Maybe<Oxidative_Stress_Test>;
  delete_question_item?: Maybe<Delete_One>;
  delete_question_items?: Maybe<Delete_Many>;
  delete_question_set_item?: Maybe<Delete_One>;
  delete_question_set_items?: Maybe<Delete_Many>;
  delete_questionnaire_conclusion_item?: Maybe<Delete_One>;
  delete_questionnaire_conclusion_items?: Maybe<Delete_Many>;
  delete_questionnaire_item?: Maybe<Delete_One>;
  delete_questionnaire_items?: Maybe<Delete_Many>;
  delete_questionnaire_question_set_item?: Maybe<Delete_One>;
  delete_questionnaire_question_set_items?: Maybe<Delete_Many>;
  /** delete data from the table: "register_code" */
  delete_register_code?: Maybe<Register_Code_Mutation_Response>;
  /** delete single row from the table: "register_code" */
  delete_register_code_by_pk?: Maybe<Register_Code>;
  /** delete data from the table: "rr_files" */
  delete_rr_files?: Maybe<Rr_Files_Mutation_Response>;
  /** delete single row from the table: "rr_files" */
  delete_rr_files_by_pk?: Maybe<Rr_Files>;
  /** delete data from the table: "rr_metadata" */
  delete_rr_metadata?: Maybe<Rr_Metadata_Mutation_Response>;
  /** delete single row from the table: "rr_metadata" */
  delete_rr_metadata_by_pk?: Maybe<Rr_Metadata>;
  /** delete data from the table: "survey" */
  delete_survey?: Maybe<Survey_Mutation_Response>;
  /** delete single row from the table: "survey" */
  delete_survey_by_pk?: Maybe<Survey>;
  /** delete data from the table: "tag" */
  delete_tag?: Maybe<Tag_Mutation_Response>;
  /** delete single row from the table: "tag" */
  delete_tag_by_pk?: Maybe<Tag>;
  delete_tutorials_item?: Maybe<Delete_One>;
  delete_tutorials_items?: Maybe<Delete_Many>;
  /** delete data from the table: "user_metadata" */
  delete_user_metadata?: Maybe<User_Metadata_Mutation_Response>;
  /** delete single row from the table: "user_metadata" */
  delete_user_metadata_by_pk?: Maybe<User_Metadata>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "v_answer" */
  delete_v_answer?: Maybe<V_Answer_Mutation_Response>;
  /** delete single row from the table: "v_answer" */
  delete_v_answer_by_pk?: Maybe<V_Answer>;
  /** delete data from the table: "v_question" */
  delete_v_question?: Maybe<V_Question_Mutation_Response>;
  /** delete data from the table: "v_question_answer" */
  delete_v_question_answer?: Maybe<V_Question_Answer_Mutation_Response>;
  /** delete single row from the table: "v_question_answer" */
  delete_v_question_answer_by_pk?: Maybe<V_Question_Answer>;
  /** delete single row from the table: "v_question" */
  delete_v_question_by_pk?: Maybe<V_Question>;
  delete_values_item?: Maybe<Delete_One>;
  delete_values_items?: Maybe<Delete_Many>;
  /** delete data from the table: "whole_body_comp" */
  delete_whole_body_comp?: Maybe<Whole_Body_Comp_Mutation_Response>;
  /** delete single row from the table: "whole_body_comp" */
  delete_whole_body_comp_by_pk?: Maybe<Whole_Body_Comp>;
  /** insert data into the table: "adrenal_function_urine_test" */
  insert_adrenal_function_urine_test?: Maybe<Adrenal_Function_Urine_Test_Mutation_Response>;
  /** insert a single row into the table: "adrenal_function_urine_test" */
  insert_adrenal_function_urine_test_one?: Maybe<Adrenal_Function_Urine_Test>;
  /** insert data into the table: "brain_spectrum" */
  insert_brain_spectrum?: Maybe<Brain_Spectrum_Mutation_Response>;
  /** insert a single row into the table: "brain_spectrum" */
  insert_brain_spectrum_one?: Maybe<Brain_Spectrum>;
  /** insert data into the table: "device" */
  insert_device?: Maybe<Device_Mutation_Response>;
  /** insert data into the table: "device_assignment" */
  insert_device_assignment?: Maybe<Device_Assignment_Mutation_Response>;
  /** insert a single row into the table: "device_assignment" */
  insert_device_assignment_one?: Maybe<Device_Assignment>;
  /** insert data into the table: "device_location" */
  insert_device_location?: Maybe<Device_Location_Mutation_Response>;
  /** insert a single row into the table: "device_location" */
  insert_device_location_one?: Maybe<Device_Location>;
  /** insert a single row into the table: "device" */
  insert_device_one?: Maybe<Device>;
  /** insert data into the table: "device_usage" */
  insert_device_usage?: Maybe<Device_Usage_Mutation_Response>;
  /** insert a single row into the table: "device_usage" */
  insert_device_usage_one?: Maybe<Device_Usage>;
  /** insert data into the table: "ecg_files" */
  insert_ecg_files?: Maybe<Ecg_Files_Mutation_Response>;
  /** insert a single row into the table: "ecg_files" */
  insert_ecg_files_one?: Maybe<Ecg_Files>;
  /** insert data into the table: "followers" */
  insert_followers?: Maybe<Followers_Mutation_Response>;
  /** insert a single row into the table: "followers" */
  insert_followers_one?: Maybe<Followers>;
  /** insert data into the table: "heart_data" */
  insert_heart_data?: Maybe<Heart_Data_Mutation_Response>;
  /** insert a single row into the table: "heart_data" */
  insert_heart_data_one?: Maybe<Heart_Data>;
  /** insert data into the table: "heart_data_progress_type" */
  insert_heart_data_progress_type?: Maybe<Heart_Data_Progress_Type_Mutation_Response>;
  /** insert a single row into the table: "heart_data_progress_type" */
  insert_heart_data_progress_type_one?: Maybe<Heart_Data_Progress_Type>;
  /** insert data into the table: "heart_data_tag" */
  insert_heart_data_tag?: Maybe<Heart_Data_Tag_Mutation_Response>;
  /** insert a single row into the table: "heart_data_tag" */
  insert_heart_data_tag_one?: Maybe<Heart_Data_Tag>;
  /** insert data into the table: "identities" */
  insert_identities?: Maybe<Identities_Mutation_Response>;
  /** insert a single row into the table: "identities" */
  insert_identities_one?: Maybe<Identities>;
  /** insert data into the table: "note" */
  insert_note?: Maybe<Note_Mutation_Response>;
  /** insert a single row into the table: "note" */
  insert_note_one?: Maybe<Note>;
  /** insert data into the table: "oxidative_stress_test" */
  insert_oxidative_stress_test?: Maybe<Oxidative_Stress_Test_Mutation_Response>;
  /** insert a single row into the table: "oxidative_stress_test" */
  insert_oxidative_stress_test_one?: Maybe<Oxidative_Stress_Test>;
  /** insert data into the table: "register_code" */
  insert_register_code?: Maybe<Register_Code_Mutation_Response>;
  /** insert a single row into the table: "register_code" */
  insert_register_code_one?: Maybe<Register_Code>;
  /** insert data into the table: "rr_files" */
  insert_rr_files?: Maybe<Rr_Files_Mutation_Response>;
  /** insert a single row into the table: "rr_files" */
  insert_rr_files_one?: Maybe<Rr_Files>;
  /** insert data into the table: "rr_metadata" */
  insert_rr_metadata?: Maybe<Rr_Metadata_Mutation_Response>;
  /** insert a single row into the table: "rr_metadata" */
  insert_rr_metadata_one?: Maybe<Rr_Metadata>;
  /** insert data into the table: "survey" */
  insert_survey?: Maybe<Survey_Mutation_Response>;
  /** insert a single row into the table: "survey" */
  insert_survey_one?: Maybe<Survey>;
  /** insert data into the table: "tag" */
  insert_tag?: Maybe<Tag_Mutation_Response>;
  /** insert a single row into the table: "tag" */
  insert_tag_one?: Maybe<Tag>;
  /** insert data into the table: "user_metadata" */
  insert_user_metadata?: Maybe<User_Metadata_Mutation_Response>;
  /** insert a single row into the table: "user_metadata" */
  insert_user_metadata_one?: Maybe<User_Metadata>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "v_answer" */
  insert_v_answer?: Maybe<V_Answer_Mutation_Response>;
  /** insert a single row into the table: "v_answer" */
  insert_v_answer_one?: Maybe<V_Answer>;
  /** insert data into the table: "v_question" */
  insert_v_question?: Maybe<V_Question_Mutation_Response>;
  /** insert data into the table: "v_question_answer" */
  insert_v_question_answer?: Maybe<V_Question_Answer_Mutation_Response>;
  /** insert a single row into the table: "v_question_answer" */
  insert_v_question_answer_one?: Maybe<V_Question_Answer>;
  /** insert a single row into the table: "v_question" */
  insert_v_question_one?: Maybe<V_Question>;
  /** insert data into the table: "whole_body_comp" */
  insert_whole_body_comp?: Maybe<Whole_Body_Comp_Mutation_Response>;
  /** insert a single row into the table: "whole_body_comp" */
  insert_whole_body_comp_one?: Maybe<Whole_Body_Comp>;
  update_BG_Raw_Scores_batch: Array<Bg_Raw_Scores>;
  update_BG_Raw_Scores_item?: Maybe<Bg_Raw_Scores>;
  update_BG_Raw_Scores_items: Array<Bg_Raw_Scores>;
  update_Disclaimer_Acknowledgement_batch: Array<Disclaimer_Acknowledgement>;
  update_Disclaimer_Acknowledgement_item?: Maybe<Disclaimer_Acknowledgement>;
  update_Disclaimer_Acknowledgement_items: Array<Disclaimer_Acknowledgement>;
  update_Disclaimers_batch: Array<Disclaimers>;
  update_Disclaimers_item?: Maybe<Disclaimers>;
  update_Disclaimers_items: Array<Disclaimers>;
  update_Feature_Requests_batch: Array<Feature_Requests>;
  update_Feature_Requests_item?: Maybe<Feature_Requests>;
  update_Feature_Requests_items: Array<Feature_Requests>;
  update_Gradient_Colour_batch: Array<Gradient_Colour>;
  update_Gradient_Colour_item?: Maybe<Gradient_Colour>;
  update_Gradient_Colour_items: Array<Gradient_Colour>;
  update_Repeat_Colour_batch: Array<Repeat_Colour>;
  update_Repeat_Colour_item?: Maybe<Repeat_Colour>;
  update_Repeat_Colour_items: Array<Repeat_Colour>;
  update_Solution_Category_batch: Array<Solution_Category>;
  update_Solution_Category_item?: Maybe<Solution_Category>;
  update_Solution_Category_items: Array<Solution_Category>;
  update_Solution_batch: Array<Solution>;
  update_Solution_item?: Maybe<Solution>;
  update_Solution_items: Array<Solution>;
  /** update data of the table: "adrenal_function_urine_test" */
  update_adrenal_function_urine_test?: Maybe<Adrenal_Function_Urine_Test_Mutation_Response>;
  /** update single row of the table: "adrenal_function_urine_test" */
  update_adrenal_function_urine_test_by_pk?: Maybe<Adrenal_Function_Urine_Test>;
  /** update multiples rows of table: "adrenal_function_urine_test" */
  update_adrenal_function_urine_test_many?: Maybe<Array<Maybe<Adrenal_Function_Urine_Test_Mutation_Response>>>;
  update_answer_batch: Array<Answer>;
  update_answer_group_batch: Array<Answer_Group>;
  update_answer_group_item?: Maybe<Answer_Group>;
  update_answer_group_items: Array<Answer_Group>;
  update_answer_item?: Maybe<Answer>;
  update_answer_items: Array<Answer>;
  update_answer_set_batch: Array<Answer_Set>;
  update_answer_set_item?: Maybe<Answer_Set>;
  update_answer_set_items: Array<Answer_Set>;
  update_bar_gradients_Gradient_Colour_batch: Array<Bar_Gradients_Gradient_Colour>;
  update_bar_gradients_Gradient_Colour_item?: Maybe<Bar_Gradients_Gradient_Colour>;
  update_bar_gradients_Gradient_Colour_items: Array<Bar_Gradients_Gradient_Colour>;
  update_bar_gradients_batch: Array<Bar_Gradients>;
  update_bar_gradients_item?: Maybe<Bar_Gradients>;
  update_bar_gradients_items: Array<Bar_Gradients>;
  update_bg_parameters_batch: Array<Bg_Parameters>;
  update_bg_parameters_item?: Maybe<Bg_Parameters>;
  update_bg_parameters_items: Array<Bg_Parameters>;
  /** update data of the table: "brain_spectrum" */
  update_brain_spectrum?: Maybe<Brain_Spectrum_Mutation_Response>;
  /** update single row of the table: "brain_spectrum" */
  update_brain_spectrum_by_pk?: Maybe<Brain_Spectrum>;
  /** update multiples rows of table: "brain_spectrum" */
  update_brain_spectrum_many?: Maybe<Array<Maybe<Brain_Spectrum_Mutation_Response>>>;
  update_descriptions_batch: Array<Descriptions>;
  update_descriptions_item?: Maybe<Descriptions>;
  update_descriptions_items: Array<Descriptions>;
  /** update data of the table: "device" */
  update_device?: Maybe<Device_Mutation_Response>;
  /** update data of the table: "device_assignment" */
  update_device_assignment?: Maybe<Device_Assignment_Mutation_Response>;
  /** update single row of the table: "device_assignment" */
  update_device_assignment_by_pk?: Maybe<Device_Assignment>;
  /** update multiples rows of table: "device_assignment" */
  update_device_assignment_many?: Maybe<Array<Maybe<Device_Assignment_Mutation_Response>>>;
  /** update single row of the table: "device" */
  update_device_by_pk?: Maybe<Device>;
  /** update data of the table: "device_location" */
  update_device_location?: Maybe<Device_Location_Mutation_Response>;
  /** update single row of the table: "device_location" */
  update_device_location_by_pk?: Maybe<Device_Location>;
  /** update multiples rows of table: "device_location" */
  update_device_location_many?: Maybe<Array<Maybe<Device_Location_Mutation_Response>>>;
  /** update multiples rows of table: "device" */
  update_device_many?: Maybe<Array<Maybe<Device_Mutation_Response>>>;
  /** update data of the table: "device_usage" */
  update_device_usage?: Maybe<Device_Usage_Mutation_Response>;
  /** update single row of the table: "device_usage" */
  update_device_usage_by_pk?: Maybe<Device_Usage>;
  /** update multiples rows of table: "device_usage" */
  update_device_usage_many?: Maybe<Array<Maybe<Device_Usage_Mutation_Response>>>;
  /** update data of the table: "ecg_files" */
  update_ecg_files?: Maybe<Ecg_Files_Mutation_Response>;
  /** update single row of the table: "ecg_files" */
  update_ecg_files_by_pk?: Maybe<Ecg_Files>;
  /** update multiples rows of table: "ecg_files" */
  update_ecg_files_many?: Maybe<Array<Maybe<Ecg_Files_Mutation_Response>>>;
  update_explanation_batch: Array<Explanation>;
  update_explanation_item?: Maybe<Explanation>;
  update_explanation_items: Array<Explanation>;
  /** update data of the table: "followers" */
  update_followers?: Maybe<Followers_Mutation_Response>;
  /** update single row of the table: "followers" */
  update_followers_by_pk?: Maybe<Followers>;
  /** update multiples rows of table: "followers" */
  update_followers_many?: Maybe<Array<Maybe<Followers_Mutation_Response>>>;
  update_global_notifications_batch: Array<Global_Notifications>;
  update_global_notifications_item?: Maybe<Global_Notifications>;
  update_global_notifications_items: Array<Global_Notifications>;
  /** update data of the table: "heart_data" */
  update_heart_data?: Maybe<Heart_Data_Mutation_Response>;
  /** update single row of the table: "heart_data" */
  update_heart_data_by_pk?: Maybe<Heart_Data>;
  /** update multiples rows of table: "heart_data" */
  update_heart_data_many?: Maybe<Array<Maybe<Heart_Data_Mutation_Response>>>;
  /** update data of the table: "heart_data_progress_type" */
  update_heart_data_progress_type?: Maybe<Heart_Data_Progress_Type_Mutation_Response>;
  /** update single row of the table: "heart_data_progress_type" */
  update_heart_data_progress_type_by_pk?: Maybe<Heart_Data_Progress_Type>;
  /** update multiples rows of table: "heart_data_progress_type" */
  update_heart_data_progress_type_many?: Maybe<Array<Maybe<Heart_Data_Progress_Type_Mutation_Response>>>;
  /** update data of the table: "heart_data_tag" */
  update_heart_data_tag?: Maybe<Heart_Data_Tag_Mutation_Response>;
  /** update single row of the table: "heart_data_tag" */
  update_heart_data_tag_by_pk?: Maybe<Heart_Data_Tag>;
  /** update multiples rows of table: "heart_data_tag" */
  update_heart_data_tag_many?: Maybe<Array<Maybe<Heart_Data_Tag_Mutation_Response>>>;
  /** update data of the table: "identities" */
  update_identities?: Maybe<Identities_Mutation_Response>;
  /** update single row of the table: "identities" */
  update_identities_by_pk?: Maybe<Identities>;
  /** update multiples rows of table: "identities" */
  update_identities_many?: Maybe<Array<Maybe<Identities_Mutation_Response>>>;
  update_match_batch: Array<Match>;
  update_match_item?: Maybe<Match>;
  update_match_items: Array<Match>;
  /** update data of the table: "note" */
  update_note?: Maybe<Note_Mutation_Response>;
  /** update single row of the table: "note" */
  update_note_by_pk?: Maybe<Note>;
  /** update multiples rows of table: "note" */
  update_note_many?: Maybe<Array<Maybe<Note_Mutation_Response>>>;
  update_option_batch: Array<Option>;
  update_option_group_batch: Array<Option_Group>;
  update_option_group_item?: Maybe<Option_Group>;
  update_option_group_items: Array<Option_Group>;
  update_option_item?: Maybe<Option>;
  update_option_items: Array<Option>;
  /** update data of the table: "oxidative_stress_test" */
  update_oxidative_stress_test?: Maybe<Oxidative_Stress_Test_Mutation_Response>;
  /** update single row of the table: "oxidative_stress_test" */
  update_oxidative_stress_test_by_pk?: Maybe<Oxidative_Stress_Test>;
  /** update multiples rows of table: "oxidative_stress_test" */
  update_oxidative_stress_test_many?: Maybe<Array<Maybe<Oxidative_Stress_Test_Mutation_Response>>>;
  update_question_batch: Array<Question>;
  update_question_item?: Maybe<Question>;
  update_question_items: Array<Question>;
  update_question_set_batch: Array<Question_Set>;
  update_question_set_item?: Maybe<Question_Set>;
  update_question_set_items: Array<Question_Set>;
  update_questionnaire_batch: Array<Questionnaire>;
  update_questionnaire_conclusion_batch: Array<Questionnaire_Conclusion>;
  update_questionnaire_conclusion_item?: Maybe<Questionnaire_Conclusion>;
  update_questionnaire_conclusion_items: Array<Questionnaire_Conclusion>;
  update_questionnaire_item?: Maybe<Questionnaire>;
  update_questionnaire_items: Array<Questionnaire>;
  update_questionnaire_question_set_batch: Array<Questionnaire_Question_Set>;
  update_questionnaire_question_set_item?: Maybe<Questionnaire_Question_Set>;
  update_questionnaire_question_set_items: Array<Questionnaire_Question_Set>;
  /** update data of the table: "register_code" */
  update_register_code?: Maybe<Register_Code_Mutation_Response>;
  /** update single row of the table: "register_code" */
  update_register_code_by_pk?: Maybe<Register_Code>;
  /** update multiples rows of table: "register_code" */
  update_register_code_many?: Maybe<Array<Maybe<Register_Code_Mutation_Response>>>;
  /** update data of the table: "rr_files" */
  update_rr_files?: Maybe<Rr_Files_Mutation_Response>;
  /** update single row of the table: "rr_files" */
  update_rr_files_by_pk?: Maybe<Rr_Files>;
  /** update multiples rows of table: "rr_files" */
  update_rr_files_many?: Maybe<Array<Maybe<Rr_Files_Mutation_Response>>>;
  /** update data of the table: "rr_metadata" */
  update_rr_metadata?: Maybe<Rr_Metadata_Mutation_Response>;
  /** update single row of the table: "rr_metadata" */
  update_rr_metadata_by_pk?: Maybe<Rr_Metadata>;
  /** update multiples rows of table: "rr_metadata" */
  update_rr_metadata_many?: Maybe<Array<Maybe<Rr_Metadata_Mutation_Response>>>;
  /** update data of the table: "survey" */
  update_survey?: Maybe<Survey_Mutation_Response>;
  /** update single row of the table: "survey" */
  update_survey_by_pk?: Maybe<Survey>;
  /** update multiples rows of table: "survey" */
  update_survey_many?: Maybe<Array<Maybe<Survey_Mutation_Response>>>;
  /** update data of the table: "tag" */
  update_tag?: Maybe<Tag_Mutation_Response>;
  /** update single row of the table: "tag" */
  update_tag_by_pk?: Maybe<Tag>;
  /** update multiples rows of table: "tag" */
  update_tag_many?: Maybe<Array<Maybe<Tag_Mutation_Response>>>;
  update_tutorials_batch: Array<Tutorials>;
  update_tutorials_item?: Maybe<Tutorials>;
  update_tutorials_items: Array<Tutorials>;
  /** update data of the table: "user_metadata" */
  update_user_metadata?: Maybe<User_Metadata_Mutation_Response>;
  /** update single row of the table: "user_metadata" */
  update_user_metadata_by_pk?: Maybe<User_Metadata>;
  /** update multiples rows of table: "user_metadata" */
  update_user_metadata_many?: Maybe<Array<Maybe<User_Metadata_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
  /** update data of the table: "v_answer" */
  update_v_answer?: Maybe<V_Answer_Mutation_Response>;
  /** update single row of the table: "v_answer" */
  update_v_answer_by_pk?: Maybe<V_Answer>;
  /** update multiples rows of table: "v_answer" */
  update_v_answer_many?: Maybe<Array<Maybe<V_Answer_Mutation_Response>>>;
  /** update data of the table: "v_question" */
  update_v_question?: Maybe<V_Question_Mutation_Response>;
  /** update data of the table: "v_question_answer" */
  update_v_question_answer?: Maybe<V_Question_Answer_Mutation_Response>;
  /** update single row of the table: "v_question_answer" */
  update_v_question_answer_by_pk?: Maybe<V_Question_Answer>;
  /** update multiples rows of table: "v_question_answer" */
  update_v_question_answer_many?: Maybe<Array<Maybe<V_Question_Answer_Mutation_Response>>>;
  /** update single row of the table: "v_question" */
  update_v_question_by_pk?: Maybe<V_Question>;
  /** update multiples rows of table: "v_question" */
  update_v_question_many?: Maybe<Array<Maybe<V_Question_Mutation_Response>>>;
  update_values_batch: Array<Values>;
  update_values_item?: Maybe<Values>;
  update_values_items: Array<Values>;
  /** update data of the table: "whole_body_comp" */
  update_whole_body_comp?: Maybe<Whole_Body_Comp_Mutation_Response>;
  /** update single row of the table: "whole_body_comp" */
  update_whole_body_comp_by_pk?: Maybe<Whole_Body_Comp>;
  /** update multiples rows of table: "whole_body_comp" */
  update_whole_body_comp_many?: Maybe<Array<Maybe<Whole_Body_Comp_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootPatchUserArgs = {
  userDetails?: InputMaybe<UserDetails>;
  userId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootCreate_Bg_Raw_Scores_ItemArgs = {
  data: Create_Bg_Raw_Scores_Input;
};


/** mutation root */
export type Mutation_RootCreate_Bg_Raw_Scores_ItemsArgs = {
  data?: InputMaybe<Array<Create_Bg_Raw_Scores_Input>>;
  filter?: InputMaybe<Bg_Raw_Scores_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Disclaimer_Acknowledgement_ItemArgs = {
  data: Create_Disclaimer_Acknowledgement_Input;
};


/** mutation root */
export type Mutation_RootCreate_Disclaimer_Acknowledgement_ItemsArgs = {
  data?: InputMaybe<Array<Create_Disclaimer_Acknowledgement_Input>>;
  filter?: InputMaybe<Disclaimer_Acknowledgement_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Disclaimers_ItemArgs = {
  data: Create_Disclaimers_Input;
};


/** mutation root */
export type Mutation_RootCreate_Disclaimers_ItemsArgs = {
  data?: InputMaybe<Array<Create_Disclaimers_Input>>;
  filter?: InputMaybe<Disclaimers_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Feature_Requests_ItemArgs = {
  data: Create_Feature_Requests_Input;
};


/** mutation root */
export type Mutation_RootCreate_Feature_Requests_ItemsArgs = {
  data?: InputMaybe<Array<Create_Feature_Requests_Input>>;
  filter?: InputMaybe<Feature_Requests_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Gradient_Colour_ItemArgs = {
  data: Create_Gradient_Colour_Input;
};


/** mutation root */
export type Mutation_RootCreate_Gradient_Colour_ItemsArgs = {
  data?: InputMaybe<Array<Create_Gradient_Colour_Input>>;
  filter?: InputMaybe<Gradient_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Repeat_Colour_ItemArgs = {
  data: Create_Repeat_Colour_Input;
};


/** mutation root */
export type Mutation_RootCreate_Repeat_Colour_ItemsArgs = {
  data?: InputMaybe<Array<Create_Repeat_Colour_Input>>;
  filter?: InputMaybe<Repeat_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Solution_Category_ItemArgs = {
  data: Create_Solution_Category_Input;
};


/** mutation root */
export type Mutation_RootCreate_Solution_Category_ItemsArgs = {
  data?: InputMaybe<Array<Create_Solution_Category_Input>>;
  filter?: InputMaybe<Solution_Category_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Solution_ItemArgs = {
  data: Create_Solution_Input;
};


/** mutation root */
export type Mutation_RootCreate_Solution_ItemsArgs = {
  data?: InputMaybe<Array<Create_Solution_Input>>;
  filter?: InputMaybe<Solution_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Answer_Group_ItemArgs = {
  data: Create_Answer_Group_Input;
};


/** mutation root */
export type Mutation_RootCreate_Answer_Group_ItemsArgs = {
  data?: InputMaybe<Array<Create_Answer_Group_Input>>;
  filter?: InputMaybe<Answer_Group_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Answer_ItemArgs = {
  data: Create_Answer_Input;
};


/** mutation root */
export type Mutation_RootCreate_Answer_ItemsArgs = {
  data?: InputMaybe<Array<Create_Answer_Input>>;
  filter?: InputMaybe<Answer_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Answer_Set_ItemArgs = {
  data: Create_Answer_Set_Input;
};


/** mutation root */
export type Mutation_RootCreate_Answer_Set_ItemsArgs = {
  data?: InputMaybe<Array<Create_Answer_Set_Input>>;
  filter?: InputMaybe<Answer_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Bar_Gradients_Gradient_Colour_ItemArgs = {
  data: Create_Bar_Gradients_Gradient_Colour_Input;
};


/** mutation root */
export type Mutation_RootCreate_Bar_Gradients_Gradient_Colour_ItemsArgs = {
  data?: InputMaybe<Array<Create_Bar_Gradients_Gradient_Colour_Input>>;
  filter?: InputMaybe<Bar_Gradients_Gradient_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Bar_Gradients_ItemArgs = {
  data: Create_Bar_Gradients_Input;
};


/** mutation root */
export type Mutation_RootCreate_Bar_Gradients_ItemsArgs = {
  data?: InputMaybe<Array<Create_Bar_Gradients_Input>>;
  filter?: InputMaybe<Bar_Gradients_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Bg_Parameters_ItemArgs = {
  data: Create_Bg_Parameters_Input;
};


/** mutation root */
export type Mutation_RootCreate_Bg_Parameters_ItemsArgs = {
  data?: InputMaybe<Array<Create_Bg_Parameters_Input>>;
  filter?: InputMaybe<Bg_Parameters_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Descriptions_ItemArgs = {
  data: Create_Descriptions_Input;
};


/** mutation root */
export type Mutation_RootCreate_Descriptions_ItemsArgs = {
  data?: InputMaybe<Array<Create_Descriptions_Input>>;
  filter?: InputMaybe<Descriptions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Explanation_ItemArgs = {
  data: Create_Explanation_Input;
};


/** mutation root */
export type Mutation_RootCreate_Explanation_ItemsArgs = {
  data?: InputMaybe<Array<Create_Explanation_Input>>;
  filter?: InputMaybe<Explanation_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Global_Notifications_ItemArgs = {
  data: Create_Global_Notifications_Input;
};


/** mutation root */
export type Mutation_RootCreate_Global_Notifications_ItemsArgs = {
  data?: InputMaybe<Array<Create_Global_Notifications_Input>>;
  filter?: InputMaybe<Global_Notifications_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Match_ItemArgs = {
  data: Create_Match_Input;
};


/** mutation root */
export type Mutation_RootCreate_Match_ItemsArgs = {
  data?: InputMaybe<Array<Create_Match_Input>>;
  filter?: InputMaybe<Match_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Option_Group_ItemArgs = {
  data: Create_Option_Group_Input;
};


/** mutation root */
export type Mutation_RootCreate_Option_Group_ItemsArgs = {
  data?: InputMaybe<Array<Create_Option_Group_Input>>;
  filter?: InputMaybe<Option_Group_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Option_ItemArgs = {
  data: Create_Option_Input;
};


/** mutation root */
export type Mutation_RootCreate_Option_ItemsArgs = {
  data?: InputMaybe<Array<Create_Option_Input>>;
  filter?: InputMaybe<Option_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Question_ItemArgs = {
  data: Create_Question_Input;
};


/** mutation root */
export type Mutation_RootCreate_Question_ItemsArgs = {
  data?: InputMaybe<Array<Create_Question_Input>>;
  filter?: InputMaybe<Question_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Question_Set_ItemArgs = {
  data: Create_Question_Set_Input;
};


/** mutation root */
export type Mutation_RootCreate_Question_Set_ItemsArgs = {
  data?: InputMaybe<Array<Create_Question_Set_Input>>;
  filter?: InputMaybe<Question_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Questionnaire_Conclusion_ItemArgs = {
  data: Create_Questionnaire_Conclusion_Input;
};


/** mutation root */
export type Mutation_RootCreate_Questionnaire_Conclusion_ItemsArgs = {
  data?: InputMaybe<Array<Create_Questionnaire_Conclusion_Input>>;
  filter?: InputMaybe<Questionnaire_Conclusion_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Questionnaire_ItemArgs = {
  data: Create_Questionnaire_Input;
};


/** mutation root */
export type Mutation_RootCreate_Questionnaire_ItemsArgs = {
  data?: InputMaybe<Array<Create_Questionnaire_Input>>;
  filter?: InputMaybe<Questionnaire_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Questionnaire_Question_Set_ItemArgs = {
  data: Create_Questionnaire_Question_Set_Input;
};


/** mutation root */
export type Mutation_RootCreate_Questionnaire_Question_Set_ItemsArgs = {
  data?: InputMaybe<Array<Create_Questionnaire_Question_Set_Input>>;
  filter?: InputMaybe<Questionnaire_Question_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Tutorials_ItemArgs = {
  data: Create_Tutorials_Input;
};


/** mutation root */
export type Mutation_RootCreate_Tutorials_ItemsArgs = {
  data?: InputMaybe<Array<Create_Tutorials_Input>>;
  filter?: InputMaybe<Tutorials_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootCreate_Values_ItemArgs = {
  data: Create_Values_Input;
};


/** mutation root */
export type Mutation_RootCreate_Values_ItemsArgs = {
  data?: InputMaybe<Array<Create_Values_Input>>;
  filter?: InputMaybe<Values_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootDelete_Bg_Raw_Scores_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Bg_Raw_Scores_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Disclaimer_Acknowledgement_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Disclaimer_Acknowledgement_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Disclaimers_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Disclaimers_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Feature_Requests_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Feature_Requests_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Gradient_Colour_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Gradient_Colour_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Repeat_Colour_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Repeat_Colour_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Solution_Category_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Solution_Category_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Solution_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Solution_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Adrenal_Function_Urine_TestArgs = {
  where: Adrenal_Function_Urine_Test_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Adrenal_Function_Urine_Test_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Answer_Group_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Answer_Group_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Answer_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Answer_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Answer_Set_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Answer_Set_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Bar_Gradients_Gradient_Colour_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Bar_Gradients_Gradient_Colour_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Bar_Gradients_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Bar_Gradients_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Bg_Parameters_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Bg_Parameters_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Brain_SpectrumArgs = {
  where: Brain_Spectrum_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Brain_Spectrum_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Descriptions_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Descriptions_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_DeviceArgs = {
  where: Device_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Device_AssignmentArgs = {
  where: Device_Assignment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Device_Assignment_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Device_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Device_LocationArgs = {
  where: Device_Location_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Device_Location_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Device_UsageArgs = {
  where: Device_Usage_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Device_Usage_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Ecg_FilesArgs = {
  where: Ecg_Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ecg_Files_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Explanation_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Explanation_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_FollowersArgs = {
  where: Followers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Followers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Global_Notifications_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Global_Notifications_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Heart_DataArgs = {
  where: Heart_Data_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Heart_Data_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Heart_Data_Progress_TypeArgs = {
  where: Heart_Data_Progress_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Heart_Data_Progress_Type_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Heart_Data_TagArgs = {
  where: Heart_Data_Tag_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Heart_Data_Tag_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_IdentitiesArgs = {
  where: Identities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Identities_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Match_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Match_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_NoteArgs = {
  where: Note_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Note_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Option_Group_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Option_Group_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Option_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Option_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Oxidative_Stress_TestArgs = {
  where: Oxidative_Stress_Test_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Oxidative_Stress_Test_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Question_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Question_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Question_Set_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Question_Set_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Questionnaire_Conclusion_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Questionnaire_Conclusion_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Questionnaire_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Questionnaire_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Questionnaire_Question_Set_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Questionnaire_Question_Set_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Register_CodeArgs = {
  where: Register_Code_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Register_Code_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Rr_FilesArgs = {
  where: Rr_Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Rr_Files_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Rr_MetadataArgs = {
  where: Rr_Metadata_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Rr_Metadata_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_SurveyArgs = {
  where: Survey_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Survey_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_TagArgs = {
  where: Tag_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tag_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Tutorials_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Tutorials_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_User_MetadataArgs = {
  where: User_Metadata_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Metadata_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_V_AnswerArgs = {
  where: V_Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_V_Answer_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_V_QuestionArgs = {
  where: V_Question_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_V_Question_AnswerArgs = {
  where: V_Question_Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_V_Question_Answer_By_PkArgs = {
  heart_data_id: Scalars['uuid'];
  question_id: Scalars['Int'];
  survey_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_V_Question_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Values_ItemArgs = {
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootDelete_Values_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


/** mutation root */
export type Mutation_RootDelete_Whole_Body_CompArgs = {
  where: Whole_Body_Comp_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Whole_Body_Comp_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_Adrenal_Function_Urine_TestArgs = {
  objects: Array<Adrenal_Function_Urine_Test_Insert_Input>;
  on_conflict?: InputMaybe<Adrenal_Function_Urine_Test_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Adrenal_Function_Urine_Test_OneArgs = {
  object: Adrenal_Function_Urine_Test_Insert_Input;
  on_conflict?: InputMaybe<Adrenal_Function_Urine_Test_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Brain_SpectrumArgs = {
  objects: Array<Brain_Spectrum_Insert_Input>;
  on_conflict?: InputMaybe<Brain_Spectrum_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Brain_Spectrum_OneArgs = {
  object: Brain_Spectrum_Insert_Input;
  on_conflict?: InputMaybe<Brain_Spectrum_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DeviceArgs = {
  objects: Array<Device_Insert_Input>;
  on_conflict?: InputMaybe<Device_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Device_AssignmentArgs = {
  objects: Array<Device_Assignment_Insert_Input>;
  on_conflict?: InputMaybe<Device_Assignment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Device_Assignment_OneArgs = {
  object: Device_Assignment_Insert_Input;
  on_conflict?: InputMaybe<Device_Assignment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Device_LocationArgs = {
  objects: Array<Device_Location_Insert_Input>;
  on_conflict?: InputMaybe<Device_Location_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Device_Location_OneArgs = {
  object: Device_Location_Insert_Input;
  on_conflict?: InputMaybe<Device_Location_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Device_OneArgs = {
  object: Device_Insert_Input;
  on_conflict?: InputMaybe<Device_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Device_UsageArgs = {
  objects: Array<Device_Usage_Insert_Input>;
  on_conflict?: InputMaybe<Device_Usage_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Device_Usage_OneArgs = {
  object: Device_Usage_Insert_Input;
  on_conflict?: InputMaybe<Device_Usage_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ecg_FilesArgs = {
  objects: Array<Ecg_Files_Insert_Input>;
  on_conflict?: InputMaybe<Ecg_Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ecg_Files_OneArgs = {
  object: Ecg_Files_Insert_Input;
  on_conflict?: InputMaybe<Ecg_Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FollowersArgs = {
  objects: Array<Followers_Insert_Input>;
  on_conflict?: InputMaybe<Followers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Followers_OneArgs = {
  object: Followers_Insert_Input;
  on_conflict?: InputMaybe<Followers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Heart_DataArgs = {
  objects: Array<Heart_Data_Insert_Input>;
  on_conflict?: InputMaybe<Heart_Data_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Heart_Data_OneArgs = {
  object: Heart_Data_Insert_Input;
  on_conflict?: InputMaybe<Heart_Data_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Heart_Data_Progress_TypeArgs = {
  objects: Array<Heart_Data_Progress_Type_Insert_Input>;
  on_conflict?: InputMaybe<Heart_Data_Progress_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Heart_Data_Progress_Type_OneArgs = {
  object: Heart_Data_Progress_Type_Insert_Input;
  on_conflict?: InputMaybe<Heart_Data_Progress_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Heart_Data_TagArgs = {
  objects: Array<Heart_Data_Tag_Insert_Input>;
  on_conflict?: InputMaybe<Heart_Data_Tag_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Heart_Data_Tag_OneArgs = {
  object: Heart_Data_Tag_Insert_Input;
  on_conflict?: InputMaybe<Heart_Data_Tag_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_IdentitiesArgs = {
  objects: Array<Identities_Insert_Input>;
  on_conflict?: InputMaybe<Identities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Identities_OneArgs = {
  object: Identities_Insert_Input;
  on_conflict?: InputMaybe<Identities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_NoteArgs = {
  objects: Array<Note_Insert_Input>;
  on_conflict?: InputMaybe<Note_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Note_OneArgs = {
  object: Note_Insert_Input;
  on_conflict?: InputMaybe<Note_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Oxidative_Stress_TestArgs = {
  objects: Array<Oxidative_Stress_Test_Insert_Input>;
  on_conflict?: InputMaybe<Oxidative_Stress_Test_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Oxidative_Stress_Test_OneArgs = {
  object: Oxidative_Stress_Test_Insert_Input;
  on_conflict?: InputMaybe<Oxidative_Stress_Test_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Register_CodeArgs = {
  objects: Array<Register_Code_Insert_Input>;
  on_conflict?: InputMaybe<Register_Code_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Register_Code_OneArgs = {
  object: Register_Code_Insert_Input;
  on_conflict?: InputMaybe<Register_Code_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Rr_FilesArgs = {
  objects: Array<Rr_Files_Insert_Input>;
  on_conflict?: InputMaybe<Rr_Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Rr_Files_OneArgs = {
  object: Rr_Files_Insert_Input;
  on_conflict?: InputMaybe<Rr_Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Rr_MetadataArgs = {
  objects: Array<Rr_Metadata_Insert_Input>;
  on_conflict?: InputMaybe<Rr_Metadata_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Rr_Metadata_OneArgs = {
  object: Rr_Metadata_Insert_Input;
  on_conflict?: InputMaybe<Rr_Metadata_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SurveyArgs = {
  objects: Array<Survey_Insert_Input>;
  on_conflict?: InputMaybe<Survey_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Survey_OneArgs = {
  object: Survey_Insert_Input;
  on_conflict?: InputMaybe<Survey_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TagArgs = {
  objects: Array<Tag_Insert_Input>;
  on_conflict?: InputMaybe<Tag_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tag_OneArgs = {
  object: Tag_Insert_Input;
  on_conflict?: InputMaybe<Tag_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_MetadataArgs = {
  objects: Array<User_Metadata_Insert_Input>;
  on_conflict?: InputMaybe<User_Metadata_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Metadata_OneArgs = {
  object: User_Metadata_Insert_Input;
  on_conflict?: InputMaybe<User_Metadata_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_V_AnswerArgs = {
  objects: Array<V_Answer_Insert_Input>;
  on_conflict?: InputMaybe<V_Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_V_Answer_OneArgs = {
  object: V_Answer_Insert_Input;
  on_conflict?: InputMaybe<V_Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_V_QuestionArgs = {
  objects: Array<V_Question_Insert_Input>;
  on_conflict?: InputMaybe<V_Question_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_V_Question_AnswerArgs = {
  objects: Array<V_Question_Answer_Insert_Input>;
  on_conflict?: InputMaybe<V_Question_Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_V_Question_Answer_OneArgs = {
  object: V_Question_Answer_Insert_Input;
  on_conflict?: InputMaybe<V_Question_Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_V_Question_OneArgs = {
  object: V_Question_Insert_Input;
  on_conflict?: InputMaybe<V_Question_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Whole_Body_CompArgs = {
  objects: Array<Whole_Body_Comp_Insert_Input>;
  on_conflict?: InputMaybe<Whole_Body_Comp_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Whole_Body_Comp_OneArgs = {
  object: Whole_Body_Comp_Insert_Input;
  on_conflict?: InputMaybe<Whole_Body_Comp_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Bg_Raw_Scores_BatchArgs = {
  data?: InputMaybe<Array<Update_Bg_Raw_Scores_Input>>;
  filter?: InputMaybe<Bg_Raw_Scores_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Bg_Raw_Scores_ItemArgs = {
  data: Update_Bg_Raw_Scores_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Bg_Raw_Scores_ItemsArgs = {
  data: Update_Bg_Raw_Scores_Input;
  filter?: InputMaybe<Bg_Raw_Scores_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Disclaimer_Acknowledgement_BatchArgs = {
  data?: InputMaybe<Array<Update_Disclaimer_Acknowledgement_Input>>;
  filter?: InputMaybe<Disclaimer_Acknowledgement_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Disclaimer_Acknowledgement_ItemArgs = {
  data: Update_Disclaimer_Acknowledgement_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Disclaimer_Acknowledgement_ItemsArgs = {
  data: Update_Disclaimer_Acknowledgement_Input;
  filter?: InputMaybe<Disclaimer_Acknowledgement_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Disclaimers_BatchArgs = {
  data?: InputMaybe<Array<Update_Disclaimers_Input>>;
  filter?: InputMaybe<Disclaimers_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Disclaimers_ItemArgs = {
  data: Update_Disclaimers_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Disclaimers_ItemsArgs = {
  data: Update_Disclaimers_Input;
  filter?: InputMaybe<Disclaimers_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Feature_Requests_BatchArgs = {
  data?: InputMaybe<Array<Update_Feature_Requests_Input>>;
  filter?: InputMaybe<Feature_Requests_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Feature_Requests_ItemArgs = {
  data: Update_Feature_Requests_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Feature_Requests_ItemsArgs = {
  data: Update_Feature_Requests_Input;
  filter?: InputMaybe<Feature_Requests_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Gradient_Colour_BatchArgs = {
  data?: InputMaybe<Array<Update_Gradient_Colour_Input>>;
  filter?: InputMaybe<Gradient_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Gradient_Colour_ItemArgs = {
  data: Update_Gradient_Colour_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Gradient_Colour_ItemsArgs = {
  data: Update_Gradient_Colour_Input;
  filter?: InputMaybe<Gradient_Colour_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Repeat_Colour_BatchArgs = {
  data?: InputMaybe<Array<Update_Repeat_Colour_Input>>;
  filter?: InputMaybe<Repeat_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Repeat_Colour_ItemArgs = {
  data: Update_Repeat_Colour_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Repeat_Colour_ItemsArgs = {
  data: Update_Repeat_Colour_Input;
  filter?: InputMaybe<Repeat_Colour_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Solution_Category_BatchArgs = {
  data?: InputMaybe<Array<Update_Solution_Category_Input>>;
  filter?: InputMaybe<Solution_Category_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Solution_Category_ItemArgs = {
  data: Update_Solution_Category_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Solution_Category_ItemsArgs = {
  data: Update_Solution_Category_Input;
  filter?: InputMaybe<Solution_Category_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Solution_BatchArgs = {
  data?: InputMaybe<Array<Update_Solution_Input>>;
  filter?: InputMaybe<Solution_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Solution_ItemArgs = {
  data: Update_Solution_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Solution_ItemsArgs = {
  data: Update_Solution_Input;
  filter?: InputMaybe<Solution_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Adrenal_Function_Urine_TestArgs = {
  _inc?: InputMaybe<Adrenal_Function_Urine_Test_Inc_Input>;
  _set?: InputMaybe<Adrenal_Function_Urine_Test_Set_Input>;
  where: Adrenal_Function_Urine_Test_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Adrenal_Function_Urine_Test_By_PkArgs = {
  _inc?: InputMaybe<Adrenal_Function_Urine_Test_Inc_Input>;
  _set?: InputMaybe<Adrenal_Function_Urine_Test_Set_Input>;
  pk_columns: Adrenal_Function_Urine_Test_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Adrenal_Function_Urine_Test_ManyArgs = {
  updates: Array<Adrenal_Function_Urine_Test_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Answer_BatchArgs = {
  data?: InputMaybe<Array<Update_Answer_Input>>;
  filter?: InputMaybe<Answer_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Answer_Group_BatchArgs = {
  data?: InputMaybe<Array<Update_Answer_Group_Input>>;
  filter?: InputMaybe<Answer_Group_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Answer_Group_ItemArgs = {
  data: Update_Answer_Group_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Answer_Group_ItemsArgs = {
  data: Update_Answer_Group_Input;
  filter?: InputMaybe<Answer_Group_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Answer_ItemArgs = {
  data: Update_Answer_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Answer_ItemsArgs = {
  data: Update_Answer_Input;
  filter?: InputMaybe<Answer_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Answer_Set_BatchArgs = {
  data?: InputMaybe<Array<Update_Answer_Set_Input>>;
  filter?: InputMaybe<Answer_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Answer_Set_ItemArgs = {
  data: Update_Answer_Set_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Answer_Set_ItemsArgs = {
  data: Update_Answer_Set_Input;
  filter?: InputMaybe<Answer_Set_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Bar_Gradients_Gradient_Colour_BatchArgs = {
  data?: InputMaybe<Array<Update_Bar_Gradients_Gradient_Colour_Input>>;
  filter?: InputMaybe<Bar_Gradients_Gradient_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Bar_Gradients_Gradient_Colour_ItemArgs = {
  data: Update_Bar_Gradients_Gradient_Colour_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Bar_Gradients_Gradient_Colour_ItemsArgs = {
  data: Update_Bar_Gradients_Gradient_Colour_Input;
  filter?: InputMaybe<Bar_Gradients_Gradient_Colour_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Bar_Gradients_BatchArgs = {
  data?: InputMaybe<Array<Update_Bar_Gradients_Input>>;
  filter?: InputMaybe<Bar_Gradients_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Bar_Gradients_ItemArgs = {
  data: Update_Bar_Gradients_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Bar_Gradients_ItemsArgs = {
  data: Update_Bar_Gradients_Input;
  filter?: InputMaybe<Bar_Gradients_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Bg_Parameters_BatchArgs = {
  data?: InputMaybe<Array<Update_Bg_Parameters_Input>>;
  filter?: InputMaybe<Bg_Parameters_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Bg_Parameters_ItemArgs = {
  data: Update_Bg_Parameters_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Bg_Parameters_ItemsArgs = {
  data: Update_Bg_Parameters_Input;
  filter?: InputMaybe<Bg_Parameters_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Brain_SpectrumArgs = {
  _append?: InputMaybe<Brain_Spectrum_Append_Input>;
  _delete_at_path?: InputMaybe<Brain_Spectrum_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Brain_Spectrum_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Brain_Spectrum_Delete_Key_Input>;
  _inc?: InputMaybe<Brain_Spectrum_Inc_Input>;
  _prepend?: InputMaybe<Brain_Spectrum_Prepend_Input>;
  _set?: InputMaybe<Brain_Spectrum_Set_Input>;
  where: Brain_Spectrum_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Brain_Spectrum_By_PkArgs = {
  _append?: InputMaybe<Brain_Spectrum_Append_Input>;
  _delete_at_path?: InputMaybe<Brain_Spectrum_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Brain_Spectrum_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Brain_Spectrum_Delete_Key_Input>;
  _inc?: InputMaybe<Brain_Spectrum_Inc_Input>;
  _prepend?: InputMaybe<Brain_Spectrum_Prepend_Input>;
  _set?: InputMaybe<Brain_Spectrum_Set_Input>;
  pk_columns: Brain_Spectrum_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Brain_Spectrum_ManyArgs = {
  updates: Array<Brain_Spectrum_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Descriptions_BatchArgs = {
  data?: InputMaybe<Array<Update_Descriptions_Input>>;
  filter?: InputMaybe<Descriptions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Descriptions_ItemArgs = {
  data: Update_Descriptions_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Descriptions_ItemsArgs = {
  data: Update_Descriptions_Input;
  filter?: InputMaybe<Descriptions_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_DeviceArgs = {
  _set?: InputMaybe<Device_Set_Input>;
  where: Device_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Device_AssignmentArgs = {
  _set?: InputMaybe<Device_Assignment_Set_Input>;
  where: Device_Assignment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Device_Assignment_By_PkArgs = {
  _set?: InputMaybe<Device_Assignment_Set_Input>;
  pk_columns: Device_Assignment_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Device_Assignment_ManyArgs = {
  updates: Array<Device_Assignment_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Device_By_PkArgs = {
  _set?: InputMaybe<Device_Set_Input>;
  pk_columns: Device_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Device_LocationArgs = {
  _inc?: InputMaybe<Device_Location_Inc_Input>;
  _set?: InputMaybe<Device_Location_Set_Input>;
  where: Device_Location_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Device_Location_By_PkArgs = {
  _inc?: InputMaybe<Device_Location_Inc_Input>;
  _set?: InputMaybe<Device_Location_Set_Input>;
  pk_columns: Device_Location_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Device_Location_ManyArgs = {
  updates: Array<Device_Location_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Device_ManyArgs = {
  updates: Array<Device_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Device_UsageArgs = {
  _inc?: InputMaybe<Device_Usage_Inc_Input>;
  _set?: InputMaybe<Device_Usage_Set_Input>;
  where: Device_Usage_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Device_Usage_By_PkArgs = {
  _inc?: InputMaybe<Device_Usage_Inc_Input>;
  _set?: InputMaybe<Device_Usage_Set_Input>;
  pk_columns: Device_Usage_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Device_Usage_ManyArgs = {
  updates: Array<Device_Usage_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Ecg_FilesArgs = {
  _inc?: InputMaybe<Ecg_Files_Inc_Input>;
  _set?: InputMaybe<Ecg_Files_Set_Input>;
  where: Ecg_Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ecg_Files_By_PkArgs = {
  _inc?: InputMaybe<Ecg_Files_Inc_Input>;
  _set?: InputMaybe<Ecg_Files_Set_Input>;
  pk_columns: Ecg_Files_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ecg_Files_ManyArgs = {
  updates: Array<Ecg_Files_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Explanation_BatchArgs = {
  data?: InputMaybe<Array<Update_Explanation_Input>>;
  filter?: InputMaybe<Explanation_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Explanation_ItemArgs = {
  data: Update_Explanation_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Explanation_ItemsArgs = {
  data: Update_Explanation_Input;
  filter?: InputMaybe<Explanation_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_FollowersArgs = {
  _set?: InputMaybe<Followers_Set_Input>;
  where: Followers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Followers_By_PkArgs = {
  _set?: InputMaybe<Followers_Set_Input>;
  pk_columns: Followers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Followers_ManyArgs = {
  updates: Array<Followers_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Global_Notifications_BatchArgs = {
  data?: InputMaybe<Array<Update_Global_Notifications_Input>>;
  filter?: InputMaybe<Global_Notifications_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Global_Notifications_ItemArgs = {
  data: Update_Global_Notifications_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Global_Notifications_ItemsArgs = {
  data: Update_Global_Notifications_Input;
  filter?: InputMaybe<Global_Notifications_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Heart_DataArgs = {
  _append?: InputMaybe<Heart_Data_Append_Input>;
  _delete_at_path?: InputMaybe<Heart_Data_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Heart_Data_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Heart_Data_Delete_Key_Input>;
  _prepend?: InputMaybe<Heart_Data_Prepend_Input>;
  _set?: InputMaybe<Heart_Data_Set_Input>;
  where: Heart_Data_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Heart_Data_By_PkArgs = {
  _append?: InputMaybe<Heart_Data_Append_Input>;
  _delete_at_path?: InputMaybe<Heart_Data_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Heart_Data_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Heart_Data_Delete_Key_Input>;
  _prepend?: InputMaybe<Heart_Data_Prepend_Input>;
  _set?: InputMaybe<Heart_Data_Set_Input>;
  pk_columns: Heart_Data_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Heart_Data_ManyArgs = {
  updates: Array<Heart_Data_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Heart_Data_Progress_TypeArgs = {
  _set?: InputMaybe<Heart_Data_Progress_Type_Set_Input>;
  where: Heart_Data_Progress_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Heart_Data_Progress_Type_By_PkArgs = {
  _set?: InputMaybe<Heart_Data_Progress_Type_Set_Input>;
  pk_columns: Heart_Data_Progress_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Heart_Data_Progress_Type_ManyArgs = {
  updates: Array<Heart_Data_Progress_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Heart_Data_TagArgs = {
  _inc?: InputMaybe<Heart_Data_Tag_Inc_Input>;
  _set?: InputMaybe<Heart_Data_Tag_Set_Input>;
  where: Heart_Data_Tag_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Heart_Data_Tag_By_PkArgs = {
  _inc?: InputMaybe<Heart_Data_Tag_Inc_Input>;
  _set?: InputMaybe<Heart_Data_Tag_Set_Input>;
  pk_columns: Heart_Data_Tag_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Heart_Data_Tag_ManyArgs = {
  updates: Array<Heart_Data_Tag_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_IdentitiesArgs = {
  _inc?: InputMaybe<Identities_Inc_Input>;
  _set?: InputMaybe<Identities_Set_Input>;
  where: Identities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Identities_By_PkArgs = {
  _inc?: InputMaybe<Identities_Inc_Input>;
  _set?: InputMaybe<Identities_Set_Input>;
  pk_columns: Identities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Identities_ManyArgs = {
  updates: Array<Identities_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Match_BatchArgs = {
  data?: InputMaybe<Array<Update_Match_Input>>;
  filter?: InputMaybe<Match_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Match_ItemArgs = {
  data: Update_Match_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Match_ItemsArgs = {
  data: Update_Match_Input;
  filter?: InputMaybe<Match_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_NoteArgs = {
  _inc?: InputMaybe<Note_Inc_Input>;
  _set?: InputMaybe<Note_Set_Input>;
  where: Note_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Note_By_PkArgs = {
  _inc?: InputMaybe<Note_Inc_Input>;
  _set?: InputMaybe<Note_Set_Input>;
  pk_columns: Note_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Note_ManyArgs = {
  updates: Array<Note_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Option_BatchArgs = {
  data?: InputMaybe<Array<Update_Option_Input>>;
  filter?: InputMaybe<Option_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Option_Group_BatchArgs = {
  data?: InputMaybe<Array<Update_Option_Group_Input>>;
  filter?: InputMaybe<Option_Group_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Option_Group_ItemArgs = {
  data: Update_Option_Group_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Option_Group_ItemsArgs = {
  data: Update_Option_Group_Input;
  filter?: InputMaybe<Option_Group_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Option_ItemArgs = {
  data: Update_Option_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Option_ItemsArgs = {
  data: Update_Option_Input;
  filter?: InputMaybe<Option_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Oxidative_Stress_TestArgs = {
  _inc?: InputMaybe<Oxidative_Stress_Test_Inc_Input>;
  _set?: InputMaybe<Oxidative_Stress_Test_Set_Input>;
  where: Oxidative_Stress_Test_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Oxidative_Stress_Test_By_PkArgs = {
  _inc?: InputMaybe<Oxidative_Stress_Test_Inc_Input>;
  _set?: InputMaybe<Oxidative_Stress_Test_Set_Input>;
  pk_columns: Oxidative_Stress_Test_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Oxidative_Stress_Test_ManyArgs = {
  updates: Array<Oxidative_Stress_Test_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Question_BatchArgs = {
  data?: InputMaybe<Array<Update_Question_Input>>;
  filter?: InputMaybe<Question_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Question_ItemArgs = {
  data: Update_Question_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Question_ItemsArgs = {
  data: Update_Question_Input;
  filter?: InputMaybe<Question_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Question_Set_BatchArgs = {
  data?: InputMaybe<Array<Update_Question_Set_Input>>;
  filter?: InputMaybe<Question_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Question_Set_ItemArgs = {
  data: Update_Question_Set_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Question_Set_ItemsArgs = {
  data: Update_Question_Set_Input;
  filter?: InputMaybe<Question_Set_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Questionnaire_BatchArgs = {
  data?: InputMaybe<Array<Update_Questionnaire_Input>>;
  filter?: InputMaybe<Questionnaire_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Questionnaire_Conclusion_BatchArgs = {
  data?: InputMaybe<Array<Update_Questionnaire_Conclusion_Input>>;
  filter?: InputMaybe<Questionnaire_Conclusion_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Questionnaire_Conclusion_ItemArgs = {
  data: Update_Questionnaire_Conclusion_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Questionnaire_Conclusion_ItemsArgs = {
  data: Update_Questionnaire_Conclusion_Input;
  filter?: InputMaybe<Questionnaire_Conclusion_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Questionnaire_ItemArgs = {
  data: Update_Questionnaire_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Questionnaire_ItemsArgs = {
  data: Update_Questionnaire_Input;
  filter?: InputMaybe<Questionnaire_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Questionnaire_Question_Set_BatchArgs = {
  data?: InputMaybe<Array<Update_Questionnaire_Question_Set_Input>>;
  filter?: InputMaybe<Questionnaire_Question_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Questionnaire_Question_Set_ItemArgs = {
  data: Update_Questionnaire_Question_Set_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Questionnaire_Question_Set_ItemsArgs = {
  data: Update_Questionnaire_Question_Set_Input;
  filter?: InputMaybe<Questionnaire_Question_Set_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Register_CodeArgs = {
  _set?: InputMaybe<Register_Code_Set_Input>;
  where: Register_Code_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Register_Code_By_PkArgs = {
  _set?: InputMaybe<Register_Code_Set_Input>;
  pk_columns: Register_Code_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Register_Code_ManyArgs = {
  updates: Array<Register_Code_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Rr_FilesArgs = {
  _set?: InputMaybe<Rr_Files_Set_Input>;
  where: Rr_Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Rr_Files_By_PkArgs = {
  _set?: InputMaybe<Rr_Files_Set_Input>;
  pk_columns: Rr_Files_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Rr_Files_ManyArgs = {
  updates: Array<Rr_Files_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Rr_MetadataArgs = {
  _append?: InputMaybe<Rr_Metadata_Append_Input>;
  _delete_at_path?: InputMaybe<Rr_Metadata_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Rr_Metadata_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Rr_Metadata_Delete_Key_Input>;
  _inc?: InputMaybe<Rr_Metadata_Inc_Input>;
  _prepend?: InputMaybe<Rr_Metadata_Prepend_Input>;
  _set?: InputMaybe<Rr_Metadata_Set_Input>;
  where: Rr_Metadata_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Rr_Metadata_By_PkArgs = {
  _append?: InputMaybe<Rr_Metadata_Append_Input>;
  _delete_at_path?: InputMaybe<Rr_Metadata_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Rr_Metadata_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Rr_Metadata_Delete_Key_Input>;
  _inc?: InputMaybe<Rr_Metadata_Inc_Input>;
  _prepend?: InputMaybe<Rr_Metadata_Prepend_Input>;
  _set?: InputMaybe<Rr_Metadata_Set_Input>;
  pk_columns: Rr_Metadata_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Rr_Metadata_ManyArgs = {
  updates: Array<Rr_Metadata_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SurveyArgs = {
  _inc?: InputMaybe<Survey_Inc_Input>;
  _set?: InputMaybe<Survey_Set_Input>;
  where: Survey_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Survey_By_PkArgs = {
  _inc?: InputMaybe<Survey_Inc_Input>;
  _set?: InputMaybe<Survey_Set_Input>;
  pk_columns: Survey_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Survey_ManyArgs = {
  updates: Array<Survey_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TagArgs = {
  _inc?: InputMaybe<Tag_Inc_Input>;
  _set?: InputMaybe<Tag_Set_Input>;
  where: Tag_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tag_By_PkArgs = {
  _inc?: InputMaybe<Tag_Inc_Input>;
  _set?: InputMaybe<Tag_Set_Input>;
  pk_columns: Tag_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Tag_ManyArgs = {
  updates: Array<Tag_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Tutorials_BatchArgs = {
  data?: InputMaybe<Array<Update_Tutorials_Input>>;
  filter?: InputMaybe<Tutorials_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Tutorials_ItemArgs = {
  data: Update_Tutorials_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Tutorials_ItemsArgs = {
  data: Update_Tutorials_Input;
  filter?: InputMaybe<Tutorials_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_User_MetadataArgs = {
  _append?: InputMaybe<User_Metadata_Append_Input>;
  _delete_at_path?: InputMaybe<User_Metadata_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<User_Metadata_Delete_Elem_Input>;
  _delete_key?: InputMaybe<User_Metadata_Delete_Key_Input>;
  _prepend?: InputMaybe<User_Metadata_Prepend_Input>;
  _set?: InputMaybe<User_Metadata_Set_Input>;
  where: User_Metadata_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Metadata_By_PkArgs = {
  _append?: InputMaybe<User_Metadata_Append_Input>;
  _delete_at_path?: InputMaybe<User_Metadata_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<User_Metadata_Delete_Elem_Input>;
  _delete_key?: InputMaybe<User_Metadata_Delete_Key_Input>;
  _prepend?: InputMaybe<User_Metadata_Prepend_Input>;
  _set?: InputMaybe<User_Metadata_Set_Input>;
  pk_columns: User_Metadata_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Metadata_ManyArgs = {
  updates: Array<User_Metadata_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_V_AnswerArgs = {
  _inc?: InputMaybe<V_Answer_Inc_Input>;
  _set?: InputMaybe<V_Answer_Set_Input>;
  where: V_Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_V_Answer_By_PkArgs = {
  _inc?: InputMaybe<V_Answer_Inc_Input>;
  _set?: InputMaybe<V_Answer_Set_Input>;
  pk_columns: V_Answer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_V_Answer_ManyArgs = {
  updates: Array<V_Answer_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_V_QuestionArgs = {
  _inc?: InputMaybe<V_Question_Inc_Input>;
  _set?: InputMaybe<V_Question_Set_Input>;
  where: V_Question_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_V_Question_AnswerArgs = {
  _inc?: InputMaybe<V_Question_Answer_Inc_Input>;
  _set?: InputMaybe<V_Question_Answer_Set_Input>;
  where: V_Question_Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_V_Question_Answer_By_PkArgs = {
  _inc?: InputMaybe<V_Question_Answer_Inc_Input>;
  _set?: InputMaybe<V_Question_Answer_Set_Input>;
  pk_columns: V_Question_Answer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_V_Question_Answer_ManyArgs = {
  updates: Array<V_Question_Answer_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_V_Question_By_PkArgs = {
  _inc?: InputMaybe<V_Question_Inc_Input>;
  _set?: InputMaybe<V_Question_Set_Input>;
  pk_columns: V_Question_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_V_Question_ManyArgs = {
  updates: Array<V_Question_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Values_BatchArgs = {
  data?: InputMaybe<Array<Update_Values_Input>>;
  filter?: InputMaybe<Values_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Values_ItemArgs = {
  data: Update_Values_Input;
  id: Scalars['ID'];
};


/** mutation root */
export type Mutation_RootUpdate_Values_ItemsArgs = {
  data: Update_Values_Input;
  filter?: InputMaybe<Values_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** mutation root */
export type Mutation_RootUpdate_Whole_Body_CompArgs = {
  _inc?: InputMaybe<Whole_Body_Comp_Inc_Input>;
  _set?: InputMaybe<Whole_Body_Comp_Set_Input>;
  where: Whole_Body_Comp_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Whole_Body_Comp_By_PkArgs = {
  _inc?: InputMaybe<Whole_Body_Comp_Inc_Input>;
  _set?: InputMaybe<Whole_Body_Comp_Set_Input>;
  pk_columns: Whole_Body_Comp_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Whole_Body_Comp_ManyArgs = {
  updates: Array<Whole_Body_Comp_Updates>;
};

/** columns and relationships of "note" */
export type Note = {
  __typename?: 'note';
  author_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  heart_data_id: Scalars['uuid'];
  id: Scalars['bigint'];
  note: Scalars['json'];
  text: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "note" */
export type NoteNoteArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "note" */
export type Note_Aggregate = {
  __typename?: 'note_aggregate';
  aggregate?: Maybe<Note_Aggregate_Fields>;
  nodes: Array<Note>;
};

export type Note_Aggregate_Bool_Exp = {
  count?: InputMaybe<Note_Aggregate_Bool_Exp_Count>;
};

export type Note_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Note_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Note_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "note" */
export type Note_Aggregate_Fields = {
  __typename?: 'note_aggregate_fields';
  avg?: Maybe<Note_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Note_Max_Fields>;
  min?: Maybe<Note_Min_Fields>;
  stddev?: Maybe<Note_Stddev_Fields>;
  stddev_pop?: Maybe<Note_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Note_Stddev_Samp_Fields>;
  sum?: Maybe<Note_Sum_Fields>;
  var_pop?: Maybe<Note_Var_Pop_Fields>;
  var_samp?: Maybe<Note_Var_Samp_Fields>;
  variance?: Maybe<Note_Variance_Fields>;
};


/** aggregate fields of "note" */
export type Note_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Note_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "note" */
export type Note_Aggregate_Order_By = {
  avg?: InputMaybe<Note_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Note_Max_Order_By>;
  min?: InputMaybe<Note_Min_Order_By>;
  stddev?: InputMaybe<Note_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Note_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Note_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Note_Sum_Order_By>;
  var_pop?: InputMaybe<Note_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Note_Var_Samp_Order_By>;
  variance?: InputMaybe<Note_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "note" */
export type Note_Arr_Rel_Insert_Input = {
  data: Array<Note_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Note_On_Conflict>;
};

/** aggregate avg on columns */
export type Note_Avg_Fields = {
  __typename?: 'note_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "note" */
export type Note_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "note". All fields are combined with a logical 'AND'. */
export type Note_Bool_Exp = {
  _and?: InputMaybe<Array<Note_Bool_Exp>>;
  _not?: InputMaybe<Note_Bool_Exp>;
  _or?: InputMaybe<Array<Note_Bool_Exp>>;
  author_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  heart_data_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  note?: InputMaybe<Json_Comparison_Exp>;
  text?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "note" */
export enum Note_Constraint {
  /** unique or primary key constraint on columns "id" */
  NotePkey = 'note_pkey'
}

/** input type for incrementing numeric columns in table "note" */
export type Note_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "note" */
export type Note_Insert_Input = {
  author_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  note?: InputMaybe<Scalars['json']>;
  text?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Note_Max_Fields = {
  __typename?: 'note_max_fields';
  author_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['bigint']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "note" */
export type Note_Max_Order_By = {
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  heart_data_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Note_Min_Fields = {
  __typename?: 'note_min_fields';
  author_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['bigint']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "note" */
export type Note_Min_Order_By = {
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  heart_data_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "note" */
export type Note_Mutation_Response = {
  __typename?: 'note_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Note>;
};

/** on_conflict condition type for table "note" */
export type Note_On_Conflict = {
  constraint: Note_Constraint;
  update_columns?: Array<Note_Update_Column>;
  where?: InputMaybe<Note_Bool_Exp>;
};

/** Ordering options when selecting data from "note". */
export type Note_Order_By = {
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  heart_data_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: note */
export type Note_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "note" */
export enum Note_Select_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  Note = 'note',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "note" */
export type Note_Set_Input = {
  author_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  note?: InputMaybe<Scalars['json']>;
  text?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Note_Stddev_Fields = {
  __typename?: 'note_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "note" */
export type Note_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Note_Stddev_Pop_Fields = {
  __typename?: 'note_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "note" */
export type Note_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Note_Stddev_Samp_Fields = {
  __typename?: 'note_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "note" */
export type Note_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "note" */
export type Note_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Note_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Note_Stream_Cursor_Value_Input = {
  author_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  note?: InputMaybe<Scalars['json']>;
  text?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Note_Sum_Fields = {
  __typename?: 'note_sum_fields';
  id?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "note" */
export type Note_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "note" */
export enum Note_Update_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  Note = 'note',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Note_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Note_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Note_Set_Input>;
  /** filter the rows which have to be updated */
  where: Note_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Note_Var_Pop_Fields = {
  __typename?: 'note_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "note" */
export type Note_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Note_Var_Samp_Fields = {
  __typename?: 'note_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "note" */
export type Note_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Note_Variance_Fields = {
  __typename?: 'note_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "note" */
export type Note_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

export type Number_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _lt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _lte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

export type Option = {
  __typename?: 'option';
  id: Scalars['ID'];
  option_group?: Maybe<Option_Group>;
  sort?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};


export type OptionOption_GroupArgs = {
  filter?: InputMaybe<Option_Group_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Option_Aggregated = {
  __typename?: 'option_aggregated';
  avg?: Maybe<Option_Aggregated_Fields>;
  avgDistinct?: Maybe<Option_Aggregated_Fields>;
  count?: Maybe<Option_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Option_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Option_Aggregated_Fields>;
  min?: Maybe<Option_Aggregated_Fields>;
  sum?: Maybe<Option_Aggregated_Fields>;
  sumDistinct?: Maybe<Option_Aggregated_Fields>;
};

export type Option_Aggregated_Count = {
  __typename?: 'option_aggregated_count';
  id?: Maybe<Scalars['Int']>;
  option_group?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Int']>;
};

export type Option_Aggregated_Fields = {
  __typename?: 'option_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  option_group?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

export type Option_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Option_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Option_Filter>>>;
  id?: InputMaybe<Number_Filter_Operators>;
  option_group?: InputMaybe<Option_Group_Filter>;
  sort?: InputMaybe<Number_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  value?: InputMaybe<Number_Filter_Operators>;
};

export type Option_Group = {
  __typename?: 'option_group';
  details?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  options?: Maybe<Array<Maybe<Option>>>;
  options_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']>;
};


export type Option_GroupOptionsArgs = {
  filter?: InputMaybe<Option_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Option_Group_Aggregated = {
  __typename?: 'option_group_aggregated';
  avg?: Maybe<Option_Group_Aggregated_Fields>;
  avgDistinct?: Maybe<Option_Group_Aggregated_Fields>;
  count?: Maybe<Option_Group_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Option_Group_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Option_Group_Aggregated_Fields>;
  min?: Maybe<Option_Group_Aggregated_Fields>;
  sum?: Maybe<Option_Group_Aggregated_Fields>;
  sumDistinct?: Maybe<Option_Group_Aggregated_Fields>;
};

export type Option_Group_Aggregated_Count = {
  __typename?: 'option_group_aggregated_count';
  details?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  options?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
};

export type Option_Group_Aggregated_Fields = {
  __typename?: 'option_group_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Option_Group_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Option_Group_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Option_Group_Filter>>>;
  details?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  options?: InputMaybe<Option_Filter>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
};

export type Option_Group_Mutated = {
  __typename?: 'option_group_mutated';
  data?: Maybe<Option_Group>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Option_Mutated = {
  __typename?: 'option_mutated';
  data?: Maybe<Option>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "oxidative_stress_test" */
export type Oxidative_Stress_Test = {
  __typename?: 'oxidative_stress_test';
  color: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  owner_id: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "oxidative_stress_test" */
export type Oxidative_Stress_Test_Aggregate = {
  __typename?: 'oxidative_stress_test_aggregate';
  aggregate?: Maybe<Oxidative_Stress_Test_Aggregate_Fields>;
  nodes: Array<Oxidative_Stress_Test>;
};

/** aggregate fields of "oxidative_stress_test" */
export type Oxidative_Stress_Test_Aggregate_Fields = {
  __typename?: 'oxidative_stress_test_aggregate_fields';
  avg?: Maybe<Oxidative_Stress_Test_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Oxidative_Stress_Test_Max_Fields>;
  min?: Maybe<Oxidative_Stress_Test_Min_Fields>;
  stddev?: Maybe<Oxidative_Stress_Test_Stddev_Fields>;
  stddev_pop?: Maybe<Oxidative_Stress_Test_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Oxidative_Stress_Test_Stddev_Samp_Fields>;
  sum?: Maybe<Oxidative_Stress_Test_Sum_Fields>;
  var_pop?: Maybe<Oxidative_Stress_Test_Var_Pop_Fields>;
  var_samp?: Maybe<Oxidative_Stress_Test_Var_Samp_Fields>;
  variance?: Maybe<Oxidative_Stress_Test_Variance_Fields>;
};


/** aggregate fields of "oxidative_stress_test" */
export type Oxidative_Stress_Test_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Oxidative_Stress_Test_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Oxidative_Stress_Test_Avg_Fields = {
  __typename?: 'oxidative_stress_test_avg_fields';
  color?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "oxidative_stress_test". All fields are combined with a logical 'AND'. */
export type Oxidative_Stress_Test_Bool_Exp = {
  _and?: InputMaybe<Array<Oxidative_Stress_Test_Bool_Exp>>;
  _not?: InputMaybe<Oxidative_Stress_Test_Bool_Exp>;
  _or?: InputMaybe<Array<Oxidative_Stress_Test_Bool_Exp>>;
  color?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "oxidative_stress_test" */
export enum Oxidative_Stress_Test_Constraint {
  /** unique or primary key constraint on columns "id" */
  OxidativeStressTestPkey = 'oxidative_stress_test_pkey'
}

/** input type for incrementing numeric columns in table "oxidative_stress_test" */
export type Oxidative_Stress_Test_Inc_Input = {
  color?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "oxidative_stress_test" */
export type Oxidative_Stress_Test_Insert_Input = {
  color?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner_id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Oxidative_Stress_Test_Max_Fields = {
  __typename?: 'oxidative_stress_test_max_fields';
  color?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  owner_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Oxidative_Stress_Test_Min_Fields = {
  __typename?: 'oxidative_stress_test_min_fields';
  color?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  owner_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "oxidative_stress_test" */
export type Oxidative_Stress_Test_Mutation_Response = {
  __typename?: 'oxidative_stress_test_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Oxidative_Stress_Test>;
};

/** on_conflict condition type for table "oxidative_stress_test" */
export type Oxidative_Stress_Test_On_Conflict = {
  constraint: Oxidative_Stress_Test_Constraint;
  update_columns?: Array<Oxidative_Stress_Test_Update_Column>;
  where?: InputMaybe<Oxidative_Stress_Test_Bool_Exp>;
};

/** Ordering options when selecting data from "oxidative_stress_test". */
export type Oxidative_Stress_Test_Order_By = {
  color?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: oxidative_stress_test */
export type Oxidative_Stress_Test_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "oxidative_stress_test" */
export enum Oxidative_Stress_Test_Select_Column {
  /** column name */
  Color = 'color',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "oxidative_stress_test" */
export type Oxidative_Stress_Test_Set_Input = {
  color?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner_id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Oxidative_Stress_Test_Stddev_Fields = {
  __typename?: 'oxidative_stress_test_stddev_fields';
  color?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Oxidative_Stress_Test_Stddev_Pop_Fields = {
  __typename?: 'oxidative_stress_test_stddev_pop_fields';
  color?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Oxidative_Stress_Test_Stddev_Samp_Fields = {
  __typename?: 'oxidative_stress_test_stddev_samp_fields';
  color?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "oxidative_stress_test" */
export type Oxidative_Stress_Test_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Oxidative_Stress_Test_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Oxidative_Stress_Test_Stream_Cursor_Value_Input = {
  color?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner_id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Oxidative_Stress_Test_Sum_Fields = {
  __typename?: 'oxidative_stress_test_sum_fields';
  color?: Maybe<Scalars['Int']>;
};

/** update columns of table "oxidative_stress_test" */
export enum Oxidative_Stress_Test_Update_Column {
  /** column name */
  Color = 'color',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Oxidative_Stress_Test_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Oxidative_Stress_Test_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Oxidative_Stress_Test_Set_Input>;
  /** filter the rows which have to be updated */
  where: Oxidative_Stress_Test_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Oxidative_Stress_Test_Var_Pop_Fields = {
  __typename?: 'oxidative_stress_test_var_pop_fields';
  color?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Oxidative_Stress_Test_Var_Samp_Fields = {
  __typename?: 'oxidative_stress_test_var_samp_fields';
  color?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Oxidative_Stress_Test_Variance_Fields = {
  __typename?: 'oxidative_stress_test_variance_fields';
  color?: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  BG_Raw_Scores: Array<Bg_Raw_Scores>;
  BG_Raw_Scores_aggregated: Array<Bg_Raw_Scores_Aggregated>;
  BG_Raw_Scores_by_id?: Maybe<Bg_Raw_Scores>;
  BG_Raw_Scores_by_version?: Maybe<Version_Bg_Raw_Scores>;
  Disclaimer_Acknowledgement: Array<Disclaimer_Acknowledgement>;
  Disclaimer_Acknowledgement_aggregated: Array<Disclaimer_Acknowledgement_Aggregated>;
  Disclaimer_Acknowledgement_by_id?: Maybe<Disclaimer_Acknowledgement>;
  Disclaimer_Acknowledgement_by_version?: Maybe<Version_Disclaimer_Acknowledgement>;
  Disclaimers: Array<Disclaimers>;
  Disclaimers_aggregated: Array<Disclaimers_Aggregated>;
  Disclaimers_by_id?: Maybe<Disclaimers>;
  Disclaimers_by_version?: Maybe<Version_Disclaimers>;
  Feature_Requests: Array<Feature_Requests>;
  Feature_Requests_aggregated: Array<Feature_Requests_Aggregated>;
  Feature_Requests_by_id?: Maybe<Feature_Requests>;
  Feature_Requests_by_version?: Maybe<Version_Feature_Requests>;
  /** This gets the user by id from the fusion auth service */
  GetUserByPk: AuthUserData;
  Gradient_Colour: Array<Gradient_Colour>;
  Gradient_Colour_aggregated: Array<Gradient_Colour_Aggregated>;
  Gradient_Colour_by_id?: Maybe<Gradient_Colour>;
  Gradient_Colour_by_version?: Maybe<Version_Gradient_Colour>;
  Repeat_Colour: Array<Repeat_Colour>;
  Repeat_Colour_aggregated: Array<Repeat_Colour_Aggregated>;
  Repeat_Colour_by_id?: Maybe<Repeat_Colour>;
  Repeat_Colour_by_version?: Maybe<Version_Repeat_Colour>;
  /** This is used to search for users on FusionAuth */
  SearchUser?: Maybe<UserSearchedResults>;
  Solution: Array<Solution>;
  Solution_Category: Array<Solution_Category>;
  Solution_Category_aggregated: Array<Solution_Category_Aggregated>;
  Solution_Category_by_id?: Maybe<Solution_Category>;
  Solution_Category_by_version?: Maybe<Version_Solution_Category>;
  Solution_aggregated: Array<Solution_Aggregated>;
  Solution_by_id?: Maybe<Solution>;
  Solution_by_version?: Maybe<Version_Solution>;
  /** fetch data from the table: "adrenal_function_urine_test" */
  adrenal_function_urine_test: Array<Adrenal_Function_Urine_Test>;
  /** fetch aggregated fields from the table: "adrenal_function_urine_test" */
  adrenal_function_urine_test_aggregate: Adrenal_Function_Urine_Test_Aggregate;
  /** fetch data from the table: "adrenal_function_urine_test" using primary key columns */
  adrenal_function_urine_test_by_pk?: Maybe<Adrenal_Function_Urine_Test>;
  answer: Array<Answer>;
  answer_aggregated: Array<Answer_Aggregated>;
  answer_by_id?: Maybe<Answer>;
  answer_by_version?: Maybe<Version_Answer>;
  answer_group: Array<Answer_Group>;
  answer_group_aggregated: Array<Answer_Group_Aggregated>;
  answer_group_by_id?: Maybe<Answer_Group>;
  answer_group_by_version?: Maybe<Version_Answer_Group>;
  answer_set: Array<Answer_Set>;
  answer_set_aggregated: Array<Answer_Set_Aggregated>;
  answer_set_by_id?: Maybe<Answer_Set>;
  answer_set_by_version?: Maybe<Version_Answer_Set>;
  bar_gradients: Array<Bar_Gradients>;
  bar_gradients_Gradient_Colour: Array<Bar_Gradients_Gradient_Colour>;
  bar_gradients_Gradient_Colour_aggregated: Array<Bar_Gradients_Gradient_Colour_Aggregated>;
  bar_gradients_Gradient_Colour_by_id?: Maybe<Bar_Gradients_Gradient_Colour>;
  bar_gradients_Gradient_Colour_by_version?: Maybe<Version_Bar_Gradients_Gradient_Colour>;
  bar_gradients_aggregated: Array<Bar_Gradients_Aggregated>;
  bar_gradients_by_id?: Maybe<Bar_Gradients>;
  bar_gradients_by_version?: Maybe<Version_Bar_Gradients>;
  bg_parameters: Array<Bg_Parameters>;
  bg_parameters_aggregated: Array<Bg_Parameters_Aggregated>;
  bg_parameters_by_id?: Maybe<Bg_Parameters>;
  bg_parameters_by_version?: Maybe<Version_Bg_Parameters>;
  /** fetch data from the table: "brain_spectrum" */
  brain_spectrum: Array<Brain_Spectrum>;
  /** fetch aggregated fields from the table: "brain_spectrum" */
  brain_spectrum_aggregate: Brain_Spectrum_Aggregate;
  /** fetch data from the table: "brain_spectrum" using primary key columns */
  brain_spectrum_by_pk?: Maybe<Brain_Spectrum>;
  descriptions: Array<Descriptions>;
  descriptions_aggregated: Array<Descriptions_Aggregated>;
  descriptions_by_id?: Maybe<Descriptions>;
  descriptions_by_version?: Maybe<Version_Descriptions>;
  /** fetch data from the table: "device" */
  device: Array<Device>;
  /** fetch aggregated fields from the table: "device" */
  device_aggregate: Device_Aggregate;
  /** fetch data from the table: "device_assignment" */
  device_assignment: Array<Device_Assignment>;
  /** fetch aggregated fields from the table: "device_assignment" */
  device_assignment_aggregate: Device_Assignment_Aggregate;
  /** fetch data from the table: "device_assignment" using primary key columns */
  device_assignment_by_pk?: Maybe<Device_Assignment>;
  /** fetch data from the table: "device" using primary key columns */
  device_by_pk?: Maybe<Device>;
  /** fetch data from the table: "device_location" */
  device_location: Array<Device_Location>;
  /** fetch aggregated fields from the table: "device_location" */
  device_location_aggregate: Device_Location_Aggregate;
  /** fetch data from the table: "device_location" using primary key columns */
  device_location_by_pk?: Maybe<Device_Location>;
  /** fetch data from the table: "device_usage" */
  device_usage: Array<Device_Usage>;
  /** fetch aggregated fields from the table: "device_usage" */
  device_usage_aggregate: Device_Usage_Aggregate;
  /** fetch data from the table: "device_usage" using primary key columns */
  device_usage_by_pk?: Maybe<Device_Usage>;
  /** fetch data from the table: "ecg_files" */
  ecg_files: Array<Ecg_Files>;
  /** fetch aggregated fields from the table: "ecg_files" */
  ecg_files_aggregate: Ecg_Files_Aggregate;
  /** fetch data from the table: "ecg_files" using primary key columns */
  ecg_files_by_pk?: Maybe<Ecg_Files>;
  explanation: Array<Explanation>;
  explanation_aggregated: Array<Explanation_Aggregated>;
  explanation_by_id?: Maybe<Explanation>;
  explanation_by_version?: Maybe<Version_Explanation>;
  /** fetch data from the table: "followers" */
  followers: Array<Followers>;
  /** fetch aggregated fields from the table: "followers" */
  followers_aggregate: Followers_Aggregate;
  /** fetch data from the table: "followers" using primary key columns */
  followers_by_pk?: Maybe<Followers>;
  /** execute function "get_heart_data_answers" which returns "v_question_answer" */
  get_heart_data_answers: Array<V_Question_Answer>;
  /** execute function "get_heart_data_answers" and query aggregates on result of table type "v_question_answer" */
  get_heart_data_answers_aggregate: V_Question_Answer_Aggregate;
  global_notifications: Array<Global_Notifications>;
  global_notifications_aggregated: Array<Global_Notifications_Aggregated>;
  global_notifications_by_id?: Maybe<Global_Notifications>;
  global_notifications_by_version?: Maybe<Version_Global_Notifications>;
  /** fetch data from the table: "heart_data" */
  heart_data: Array<Heart_Data>;
  /** fetch aggregated fields from the table: "heart_data" */
  heart_data_aggregate: Heart_Data_Aggregate;
  /** fetch data from the table: "heart_data" using primary key columns */
  heart_data_by_pk?: Maybe<Heart_Data>;
  /** fetch data from the table: "heart_data_progress_type" */
  heart_data_progress_type: Array<Heart_Data_Progress_Type>;
  /** fetch aggregated fields from the table: "heart_data_progress_type" */
  heart_data_progress_type_aggregate: Heart_Data_Progress_Type_Aggregate;
  /** fetch data from the table: "heart_data_progress_type" using primary key columns */
  heart_data_progress_type_by_pk?: Maybe<Heart_Data_Progress_Type>;
  /** fetch data from the table: "heart_data_tag" */
  heart_data_tag: Array<Heart_Data_Tag>;
  /** fetch aggregated fields from the table: "heart_data_tag" */
  heart_data_tag_aggregate: Heart_Data_Tag_Aggregate;
  /** fetch data from the table: "heart_data_tag" using primary key columns */
  heart_data_tag_by_pk?: Maybe<Heart_Data_Tag>;
  /** An array relationship */
  identities: Array<Identities>;
  /** An aggregate relationship */
  identities_aggregate: Identities_Aggregate;
  /** fetch data from the table: "identities" using primary key columns */
  identities_by_pk?: Maybe<Identities>;
  match: Array<Match>;
  match_aggregated: Array<Match_Aggregated>;
  match_by_id?: Maybe<Match>;
  match_by_version?: Maybe<Version_Match>;
  /** fetch data from the table: "note" */
  note: Array<Note>;
  /** fetch aggregated fields from the table: "note" */
  note_aggregate: Note_Aggregate;
  /** fetch data from the table: "note" using primary key columns */
  note_by_pk?: Maybe<Note>;
  option: Array<Option>;
  option_aggregated: Array<Option_Aggregated>;
  option_by_id?: Maybe<Option>;
  option_by_version?: Maybe<Version_Option>;
  option_group: Array<Option_Group>;
  option_group_aggregated: Array<Option_Group_Aggregated>;
  option_group_by_id?: Maybe<Option_Group>;
  option_group_by_version?: Maybe<Version_Option_Group>;
  /** fetch data from the table: "oxidative_stress_test" */
  oxidative_stress_test: Array<Oxidative_Stress_Test>;
  /** fetch aggregated fields from the table: "oxidative_stress_test" */
  oxidative_stress_test_aggregate: Oxidative_Stress_Test_Aggregate;
  /** fetch data from the table: "oxidative_stress_test" using primary key columns */
  oxidative_stress_test_by_pk?: Maybe<Oxidative_Stress_Test>;
  question: Array<Question>;
  question_aggregated: Array<Question_Aggregated>;
  question_by_id?: Maybe<Question>;
  question_by_version?: Maybe<Version_Question>;
  question_set: Array<Question_Set>;
  question_set_aggregated: Array<Question_Set_Aggregated>;
  question_set_by_id?: Maybe<Question_Set>;
  question_set_by_version?: Maybe<Version_Question_Set>;
  questionnaire: Array<Questionnaire>;
  questionnaire_aggregated: Array<Questionnaire_Aggregated>;
  questionnaire_by_id?: Maybe<Questionnaire>;
  questionnaire_by_version?: Maybe<Version_Questionnaire>;
  questionnaire_conclusion: Array<Questionnaire_Conclusion>;
  questionnaire_conclusion_aggregated: Array<Questionnaire_Conclusion_Aggregated>;
  questionnaire_conclusion_by_id?: Maybe<Questionnaire_Conclusion>;
  questionnaire_conclusion_by_version?: Maybe<Version_Questionnaire_Conclusion>;
  questionnaire_question_set: Array<Questionnaire_Question_Set>;
  questionnaire_question_set_aggregated: Array<Questionnaire_Question_Set_Aggregated>;
  questionnaire_question_set_by_id?: Maybe<Questionnaire_Question_Set>;
  questionnaire_question_set_by_version?: Maybe<Version_Questionnaire_Question_Set>;
  /** fetch data from the table: "register_code" */
  register_code: Array<Register_Code>;
  /** fetch aggregated fields from the table: "register_code" */
  register_code_aggregate: Register_Code_Aggregate;
  /** fetch data from the table: "register_code" using primary key columns */
  register_code_by_pk?: Maybe<Register_Code>;
  /** fetch data from the table: "rr_files" */
  rr_files: Array<Rr_Files>;
  /** fetch aggregated fields from the table: "rr_files" */
  rr_files_aggregate: Rr_Files_Aggregate;
  /** fetch data from the table: "rr_files" using primary key columns */
  rr_files_by_pk?: Maybe<Rr_Files>;
  /** fetch data from the table: "rr_metadata" */
  rr_metadata: Array<Rr_Metadata>;
  /** fetch aggregated fields from the table: "rr_metadata" */
  rr_metadata_aggregate: Rr_Metadata_Aggregate;
  /** fetch data from the table: "rr_metadata" using primary key columns */
  rr_metadata_by_pk?: Maybe<Rr_Metadata>;
  /** fetch data from the table: "survey" */
  survey: Array<Survey>;
  /** fetch aggregated fields from the table: "survey" */
  survey_aggregate: Survey_Aggregate;
  /** fetch data from the table: "survey" using primary key columns */
  survey_by_pk?: Maybe<Survey>;
  /** fetch data from the table: "tag" */
  tag: Array<Tag>;
  /** fetch aggregated fields from the table: "tag" */
  tag_aggregate: Tag_Aggregate;
  /** fetch data from the table: "tag" using primary key columns */
  tag_by_pk?: Maybe<Tag>;
  tutorials: Array<Tutorials>;
  tutorials_aggregated: Array<Tutorials_Aggregated>;
  tutorials_by_id?: Maybe<Tutorials>;
  tutorials_by_version?: Maybe<Version_Tutorials>;
  user?: Maybe<User>;
  userByEmail?: Maybe<FindUserResult>;
  /** fetch data from the table: "user_metadata" */
  user_metadata: Array<User_Metadata>;
  /** fetch aggregated fields from the table: "user_metadata" */
  user_metadata_aggregate: User_Metadata_Aggregate;
  /** fetch data from the table: "user_metadata" using primary key columns */
  user_metadata_by_pk?: Maybe<User_Metadata>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "v_answer" */
  v_answer: Array<V_Answer>;
  /** fetch aggregated fields from the table: "v_answer" */
  v_answer_aggregate: V_Answer_Aggregate;
  /** fetch data from the table: "v_answer" using primary key columns */
  v_answer_by_pk?: Maybe<V_Answer>;
  /** fetch data from the table: "v_question" */
  v_question: Array<V_Question>;
  /** fetch aggregated fields from the table: "v_question" */
  v_question_aggregate: V_Question_Aggregate;
  /** fetch data from the table: "v_question_answer" */
  v_question_answer: Array<V_Question_Answer>;
  /** fetch aggregated fields from the table: "v_question_answer" */
  v_question_answer_aggregate: V_Question_Answer_Aggregate;
  /** fetch data from the table: "v_question_answer" using primary key columns */
  v_question_answer_by_pk?: Maybe<V_Question_Answer>;
  /** fetch data from the table: "v_question" using primary key columns */
  v_question_by_pk?: Maybe<V_Question>;
  values: Array<Values>;
  values_aggregated: Array<Values_Aggregated>;
  values_by_id?: Maybe<Values>;
  values_by_version?: Maybe<Version_Values>;
  /** fetch data from the table: "whole_body_comp" */
  whole_body_comp: Array<Whole_Body_Comp>;
  /** fetch aggregated fields from the table: "whole_body_comp" */
  whole_body_comp_aggregate: Whole_Body_Comp_Aggregate;
  /** fetch data from the table: "whole_body_comp" using primary key columns */
  whole_body_comp_by_pk?: Maybe<Whole_Body_Comp>;
};


export type Query_RootBg_Raw_ScoresArgs = {
  filter?: InputMaybe<Bg_Raw_Scores_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootBg_Raw_Scores_AggregatedArgs = {
  filter?: InputMaybe<Bg_Raw_Scores_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootBg_Raw_Scores_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootBg_Raw_Scores_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootDisclaimer_AcknowledgementArgs = {
  filter?: InputMaybe<Disclaimer_Acknowledgement_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootDisclaimer_Acknowledgement_AggregatedArgs = {
  filter?: InputMaybe<Disclaimer_Acknowledgement_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootDisclaimer_Acknowledgement_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootDisclaimer_Acknowledgement_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootDisclaimersArgs = {
  filter?: InputMaybe<Disclaimers_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootDisclaimers_AggregatedArgs = {
  filter?: InputMaybe<Disclaimers_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootDisclaimers_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootDisclaimers_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootFeature_RequestsArgs = {
  filter?: InputMaybe<Feature_Requests_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootFeature_Requests_AggregatedArgs = {
  filter?: InputMaybe<Feature_Requests_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootFeature_Requests_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootFeature_Requests_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootGetUserByPkArgs = {
  uid: Scalars['String'];
};


export type Query_RootGradient_ColourArgs = {
  filter?: InputMaybe<Gradient_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootGradient_Colour_AggregatedArgs = {
  filter?: InputMaybe<Gradient_Colour_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootGradient_Colour_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootGradient_Colour_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootRepeat_ColourArgs = {
  filter?: InputMaybe<Repeat_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootRepeat_Colour_AggregatedArgs = {
  filter?: InputMaybe<Repeat_Colour_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootRepeat_Colour_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootRepeat_Colour_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootSearchUserArgs = {
  queryString: Scalars['String'];
};


export type Query_RootSolutionArgs = {
  filter?: InputMaybe<Solution_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootSolution_CategoryArgs = {
  filter?: InputMaybe<Solution_Category_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootSolution_Category_AggregatedArgs = {
  filter?: InputMaybe<Solution_Category_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootSolution_Category_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootSolution_Category_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootSolution_AggregatedArgs = {
  filter?: InputMaybe<Solution_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootSolution_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootSolution_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootAdrenal_Function_Urine_TestArgs = {
  distinct_on?: InputMaybe<Array<Adrenal_Function_Urine_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Adrenal_Function_Urine_Test_Order_By>>;
  where?: InputMaybe<Adrenal_Function_Urine_Test_Bool_Exp>;
};


export type Query_RootAdrenal_Function_Urine_Test_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Adrenal_Function_Urine_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Adrenal_Function_Urine_Test_Order_By>>;
  where?: InputMaybe<Adrenal_Function_Urine_Test_Bool_Exp>;
};


export type Query_RootAdrenal_Function_Urine_Test_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAnswerArgs = {
  filter?: InputMaybe<Answer_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootAnswer_AggregatedArgs = {
  filter?: InputMaybe<Answer_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootAnswer_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootAnswer_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootAnswer_GroupArgs = {
  filter?: InputMaybe<Answer_Group_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootAnswer_Group_AggregatedArgs = {
  filter?: InputMaybe<Answer_Group_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootAnswer_Group_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootAnswer_Group_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootAnswer_SetArgs = {
  filter?: InputMaybe<Answer_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootAnswer_Set_AggregatedArgs = {
  filter?: InputMaybe<Answer_Set_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootAnswer_Set_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootAnswer_Set_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootBar_GradientsArgs = {
  filter?: InputMaybe<Bar_Gradients_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootBar_Gradients_Gradient_ColourArgs = {
  filter?: InputMaybe<Bar_Gradients_Gradient_Colour_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootBar_Gradients_Gradient_Colour_AggregatedArgs = {
  filter?: InputMaybe<Bar_Gradients_Gradient_Colour_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootBar_Gradients_Gradient_Colour_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootBar_Gradients_Gradient_Colour_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootBar_Gradients_AggregatedArgs = {
  filter?: InputMaybe<Bar_Gradients_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootBar_Gradients_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootBar_Gradients_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootBg_ParametersArgs = {
  filter?: InputMaybe<Bg_Parameters_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootBg_Parameters_AggregatedArgs = {
  filter?: InputMaybe<Bg_Parameters_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootBg_Parameters_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootBg_Parameters_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootBrain_SpectrumArgs = {
  distinct_on?: InputMaybe<Array<Brain_Spectrum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brain_Spectrum_Order_By>>;
  where?: InputMaybe<Brain_Spectrum_Bool_Exp>;
};


export type Query_RootBrain_Spectrum_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Brain_Spectrum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brain_Spectrum_Order_By>>;
  where?: InputMaybe<Brain_Spectrum_Bool_Exp>;
};


export type Query_RootBrain_Spectrum_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootDescriptionsArgs = {
  filter?: InputMaybe<Descriptions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootDescriptions_AggregatedArgs = {
  filter?: InputMaybe<Descriptions_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootDescriptions_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootDescriptions_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootDeviceArgs = {
  distinct_on?: InputMaybe<Array<Device_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Order_By>>;
  where?: InputMaybe<Device_Bool_Exp>;
};


export type Query_RootDevice_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Device_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Order_By>>;
  where?: InputMaybe<Device_Bool_Exp>;
};


export type Query_RootDevice_AssignmentArgs = {
  distinct_on?: InputMaybe<Array<Device_Assignment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Assignment_Order_By>>;
  where?: InputMaybe<Device_Assignment_Bool_Exp>;
};


export type Query_RootDevice_Assignment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Device_Assignment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Assignment_Order_By>>;
  where?: InputMaybe<Device_Assignment_Bool_Exp>;
};


export type Query_RootDevice_Assignment_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootDevice_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootDevice_LocationArgs = {
  distinct_on?: InputMaybe<Array<Device_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Location_Order_By>>;
  where?: InputMaybe<Device_Location_Bool_Exp>;
};


export type Query_RootDevice_Location_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Device_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Location_Order_By>>;
  where?: InputMaybe<Device_Location_Bool_Exp>;
};


export type Query_RootDevice_Location_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootDevice_UsageArgs = {
  distinct_on?: InputMaybe<Array<Device_Usage_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Usage_Order_By>>;
  where?: InputMaybe<Device_Usage_Bool_Exp>;
};


export type Query_RootDevice_Usage_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Device_Usage_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Usage_Order_By>>;
  where?: InputMaybe<Device_Usage_Bool_Exp>;
};


export type Query_RootDevice_Usage_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootEcg_FilesArgs = {
  distinct_on?: InputMaybe<Array<Ecg_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ecg_Files_Order_By>>;
  where?: InputMaybe<Ecg_Files_Bool_Exp>;
};


export type Query_RootEcg_Files_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ecg_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ecg_Files_Order_By>>;
  where?: InputMaybe<Ecg_Files_Bool_Exp>;
};


export type Query_RootEcg_Files_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootExplanationArgs = {
  filter?: InputMaybe<Explanation_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootExplanation_AggregatedArgs = {
  filter?: InputMaybe<Explanation_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootExplanation_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootExplanation_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootFollowersArgs = {
  distinct_on?: InputMaybe<Array<Followers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Followers_Order_By>>;
  where?: InputMaybe<Followers_Bool_Exp>;
};


export type Query_RootFollowers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Followers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Followers_Order_By>>;
  where?: InputMaybe<Followers_Bool_Exp>;
};


export type Query_RootFollowers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGet_Heart_Data_AnswersArgs = {
  args: Get_Heart_Data_Answers_Args;
  distinct_on?: InputMaybe<Array<V_Question_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Answer_Order_By>>;
  where?: InputMaybe<V_Question_Answer_Bool_Exp>;
};


export type Query_RootGet_Heart_Data_Answers_AggregateArgs = {
  args: Get_Heart_Data_Answers_Args;
  distinct_on?: InputMaybe<Array<V_Question_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Answer_Order_By>>;
  where?: InputMaybe<V_Question_Answer_Bool_Exp>;
};


export type Query_RootGlobal_NotificationsArgs = {
  filter?: InputMaybe<Global_Notifications_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootGlobal_Notifications_AggregatedArgs = {
  filter?: InputMaybe<Global_Notifications_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootGlobal_Notifications_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootGlobal_Notifications_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootHeart_DataArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Order_By>>;
  where?: InputMaybe<Heart_Data_Bool_Exp>;
};


export type Query_RootHeart_Data_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Order_By>>;
  where?: InputMaybe<Heart_Data_Bool_Exp>;
};


export type Query_RootHeart_Data_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootHeart_Data_Progress_TypeArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Progress_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Progress_Type_Order_By>>;
  where?: InputMaybe<Heart_Data_Progress_Type_Bool_Exp>;
};


export type Query_RootHeart_Data_Progress_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Progress_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Progress_Type_Order_By>>;
  where?: InputMaybe<Heart_Data_Progress_Type_Bool_Exp>;
};


export type Query_RootHeart_Data_Progress_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootHeart_Data_TagArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Tag_Order_By>>;
  where?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
};


export type Query_RootHeart_Data_Tag_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Tag_Order_By>>;
  where?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
};


export type Query_RootHeart_Data_Tag_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootIdentitiesArgs = {
  distinct_on?: InputMaybe<Array<Identities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identities_Order_By>>;
  where?: InputMaybe<Identities_Bool_Exp>;
};


export type Query_RootIdentities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Identities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identities_Order_By>>;
  where?: InputMaybe<Identities_Bool_Exp>;
};


export type Query_RootIdentities_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootMatchArgs = {
  filter?: InputMaybe<Match_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootMatch_AggregatedArgs = {
  filter?: InputMaybe<Match_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootMatch_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootMatch_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootNoteArgs = {
  distinct_on?: InputMaybe<Array<Note_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Note_Order_By>>;
  where?: InputMaybe<Note_Bool_Exp>;
};


export type Query_RootNote_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Note_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Note_Order_By>>;
  where?: InputMaybe<Note_Bool_Exp>;
};


export type Query_RootNote_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootOptionArgs = {
  filter?: InputMaybe<Option_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootOption_AggregatedArgs = {
  filter?: InputMaybe<Option_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootOption_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootOption_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootOption_GroupArgs = {
  filter?: InputMaybe<Option_Group_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootOption_Group_AggregatedArgs = {
  filter?: InputMaybe<Option_Group_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootOption_Group_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootOption_Group_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootOxidative_Stress_TestArgs = {
  distinct_on?: InputMaybe<Array<Oxidative_Stress_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Oxidative_Stress_Test_Order_By>>;
  where?: InputMaybe<Oxidative_Stress_Test_Bool_Exp>;
};


export type Query_RootOxidative_Stress_Test_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Oxidative_Stress_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Oxidative_Stress_Test_Order_By>>;
  where?: InputMaybe<Oxidative_Stress_Test_Bool_Exp>;
};


export type Query_RootOxidative_Stress_Test_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootQuestionArgs = {
  filter?: InputMaybe<Question_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootQuestion_AggregatedArgs = {
  filter?: InputMaybe<Question_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootQuestion_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootQuestion_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootQuestion_SetArgs = {
  filter?: InputMaybe<Question_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootQuestion_Set_AggregatedArgs = {
  filter?: InputMaybe<Question_Set_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootQuestion_Set_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootQuestion_Set_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootQuestionnaireArgs = {
  filter?: InputMaybe<Questionnaire_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootQuestionnaire_AggregatedArgs = {
  filter?: InputMaybe<Questionnaire_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootQuestionnaire_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootQuestionnaire_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootQuestionnaire_ConclusionArgs = {
  filter?: InputMaybe<Questionnaire_Conclusion_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootQuestionnaire_Conclusion_AggregatedArgs = {
  filter?: InputMaybe<Questionnaire_Conclusion_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootQuestionnaire_Conclusion_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootQuestionnaire_Conclusion_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootQuestionnaire_Question_SetArgs = {
  filter?: InputMaybe<Questionnaire_Question_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootQuestionnaire_Question_Set_AggregatedArgs = {
  filter?: InputMaybe<Questionnaire_Question_Set_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootQuestionnaire_Question_Set_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootQuestionnaire_Question_Set_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootRegister_CodeArgs = {
  distinct_on?: InputMaybe<Array<Register_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Register_Code_Order_By>>;
  where?: InputMaybe<Register_Code_Bool_Exp>;
};


export type Query_RootRegister_Code_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Register_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Register_Code_Order_By>>;
  where?: InputMaybe<Register_Code_Bool_Exp>;
};


export type Query_RootRegister_Code_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootRr_FilesArgs = {
  distinct_on?: InputMaybe<Array<Rr_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rr_Files_Order_By>>;
  where?: InputMaybe<Rr_Files_Bool_Exp>;
};


export type Query_RootRr_Files_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rr_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rr_Files_Order_By>>;
  where?: InputMaybe<Rr_Files_Bool_Exp>;
};


export type Query_RootRr_Files_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootRr_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Rr_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rr_Metadata_Order_By>>;
  where?: InputMaybe<Rr_Metadata_Bool_Exp>;
};


export type Query_RootRr_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rr_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rr_Metadata_Order_By>>;
  where?: InputMaybe<Rr_Metadata_Bool_Exp>;
};


export type Query_RootRr_Metadata_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSurveyArgs = {
  distinct_on?: InputMaybe<Array<Survey_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Survey_Order_By>>;
  where?: InputMaybe<Survey_Bool_Exp>;
};


export type Query_RootSurvey_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Survey_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Survey_Order_By>>;
  where?: InputMaybe<Survey_Bool_Exp>;
};


export type Query_RootSurvey_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootTagArgs = {
  distinct_on?: InputMaybe<Array<Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tag_Order_By>>;
  where?: InputMaybe<Tag_Bool_Exp>;
};


export type Query_RootTag_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tag_Order_By>>;
  where?: InputMaybe<Tag_Bool_Exp>;
};


export type Query_RootTag_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootTutorialsArgs = {
  filter?: InputMaybe<Tutorials_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootTutorials_AggregatedArgs = {
  filter?: InputMaybe<Tutorials_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootTutorials_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootTutorials_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootUserArgs = {
  id: Scalars['String'];
};


export type Query_RootUserByEmailArgs = {
  email: Scalars['String'];
};


export type Query_RootUser_MetadataArgs = {
  distinct_on?: InputMaybe<Array<User_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Metadata_Order_By>>;
  where?: InputMaybe<User_Metadata_Bool_Exp>;
};


export type Query_RootUser_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Metadata_Order_By>>;
  where?: InputMaybe<User_Metadata_Bool_Exp>;
};


export type Query_RootUser_Metadata_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootV_AnswerArgs = {
  distinct_on?: InputMaybe<Array<V_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Answer_Order_By>>;
  where?: InputMaybe<V_Answer_Bool_Exp>;
};


export type Query_RootV_Answer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<V_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Answer_Order_By>>;
  where?: InputMaybe<V_Answer_Bool_Exp>;
};


export type Query_RootV_Answer_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootV_QuestionArgs = {
  distinct_on?: InputMaybe<Array<V_Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Order_By>>;
  where?: InputMaybe<V_Question_Bool_Exp>;
};


export type Query_RootV_Question_AggregateArgs = {
  distinct_on?: InputMaybe<Array<V_Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Order_By>>;
  where?: InputMaybe<V_Question_Bool_Exp>;
};


export type Query_RootV_Question_AnswerArgs = {
  distinct_on?: InputMaybe<Array<V_Question_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Answer_Order_By>>;
  where?: InputMaybe<V_Question_Answer_Bool_Exp>;
};


export type Query_RootV_Question_Answer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<V_Question_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Answer_Order_By>>;
  where?: InputMaybe<V_Question_Answer_Bool_Exp>;
};


export type Query_RootV_Question_Answer_By_PkArgs = {
  heart_data_id: Scalars['uuid'];
  question_id: Scalars['Int'];
  survey_id: Scalars['Int'];
};


export type Query_RootV_Question_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootValuesArgs = {
  filter?: InputMaybe<Values_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootValues_AggregatedArgs = {
  filter?: InputMaybe<Values_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Query_RootValues_By_IdArgs = {
  id: Scalars['ID'];
  version?: InputMaybe<Scalars['String']>;
};


export type Query_RootValues_By_VersionArgs = {
  id: Scalars['ID'];
  version: Scalars['String'];
};


export type Query_RootWhole_Body_CompArgs = {
  distinct_on?: InputMaybe<Array<Whole_Body_Comp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Whole_Body_Comp_Order_By>>;
  where?: InputMaybe<Whole_Body_Comp_Bool_Exp>;
};


export type Query_RootWhole_Body_Comp_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Whole_Body_Comp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Whole_Body_Comp_Order_By>>;
  where?: InputMaybe<Whole_Body_Comp_Bool_Exp>;
};


export type Query_RootWhole_Body_Comp_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Question = {
  __typename?: 'question';
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  instructions?: Maybe<Scalars['String']>;
  option_group?: Maybe<Option_Group>;
  question?: Maybe<Scalars['String']>;
  question_set?: Maybe<Question_Set>;
  sort?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type QuestionOption_GroupArgs = {
  filter?: InputMaybe<Option_Group_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuestionQuestion_SetArgs = {
  filter?: InputMaybe<Question_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuestionUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuestionUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Question_Aggregated = {
  __typename?: 'question_aggregated';
  avg?: Maybe<Question_Aggregated_Fields>;
  avgDistinct?: Maybe<Question_Aggregated_Fields>;
  count?: Maybe<Question_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Question_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Question_Aggregated_Fields>;
  min?: Maybe<Question_Aggregated_Fields>;
  sum?: Maybe<Question_Aggregated_Fields>;
  sumDistinct?: Maybe<Question_Aggregated_Fields>;
};

export type Question_Aggregated_Count = {
  __typename?: 'question_aggregated_count';
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  instructions?: Maybe<Scalars['Int']>;
  option_group?: Maybe<Scalars['Int']>;
  question?: Maybe<Scalars['Int']>;
  question_set?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Question_Aggregated_Fields = {
  __typename?: 'question_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  option_group?: Maybe<Scalars['Float']>;
  question_set?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Question_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Question_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Question_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  instructions?: InputMaybe<String_Filter_Operators>;
  option_group?: InputMaybe<Option_Group_Filter>;
  question?: InputMaybe<String_Filter_Operators>;
  question_set?: InputMaybe<Question_Set_Filter>;
  sort?: InputMaybe<Number_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Question_Mutated = {
  __typename?: 'question_mutated';
  data?: Maybe<Question>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Question_Set = {
  __typename?: 'question_set';
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  instructions?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  questionnaires?: Maybe<Array<Maybe<Questionnaire_Question_Set>>>;
  questionnaires_func?: Maybe<Count_Functions>;
  questions?: Maybe<Array<Maybe<Question>>>;
  questions_func?: Maybe<Count_Functions>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};


export type Question_SetQuestionnairesArgs = {
  filter?: InputMaybe<Questionnaire_Question_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Question_SetQuestionsArgs = {
  filter?: InputMaybe<Question_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Question_Set_Aggregated = {
  __typename?: 'question_set_aggregated';
  avg?: Maybe<Question_Set_Aggregated_Fields>;
  avgDistinct?: Maybe<Question_Set_Aggregated_Fields>;
  count?: Maybe<Question_Set_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Question_Set_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Question_Set_Aggregated_Fields>;
  min?: Maybe<Question_Set_Aggregated_Fields>;
  sum?: Maybe<Question_Set_Aggregated_Fields>;
  sumDistinct?: Maybe<Question_Set_Aggregated_Fields>;
};

export type Question_Set_Aggregated_Count = {
  __typename?: 'question_set_aggregated_count';
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  instructions?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['Int']>;
  questionnaires?: Maybe<Scalars['Int']>;
  questions?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
};

export type Question_Set_Aggregated_Fields = {
  __typename?: 'question_set_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Question_Set_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Question_Set_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Question_Set_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  instructions?: InputMaybe<String_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  questionnaires?: InputMaybe<Questionnaire_Question_Set_Filter>;
  questionnaires_func?: InputMaybe<Count_Function_Filter_Operators>;
  questions?: InputMaybe<Question_Filter>;
  questions_func?: InputMaybe<Count_Function_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
};

export type Question_Set_Mutated = {
  __typename?: 'question_set_mutated';
  data?: Maybe<Question_Set>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Questionnaire = {
  __typename?: 'questionnaire';
  answer_group?: Maybe<Array<Maybe<Answer_Group>>>;
  answer_group_func?: Maybe<Count_Functions>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  instructions?: Maybe<Scalars['String']>;
  question_sets?: Maybe<Array<Maybe<Questionnaire_Question_Set>>>;
  question_sets_func?: Maybe<Count_Functions>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type QuestionnaireAnswer_GroupArgs = {
  filter?: InputMaybe<Answer_Group_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuestionnaireQuestion_SetsArgs = {
  filter?: InputMaybe<Questionnaire_Question_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuestionnaireUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuestionnaireUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Questionnaire_Aggregated = {
  __typename?: 'questionnaire_aggregated';
  avg?: Maybe<Questionnaire_Aggregated_Fields>;
  avgDistinct?: Maybe<Questionnaire_Aggregated_Fields>;
  count?: Maybe<Questionnaire_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Questionnaire_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Questionnaire_Aggregated_Fields>;
  min?: Maybe<Questionnaire_Aggregated_Fields>;
  sum?: Maybe<Questionnaire_Aggregated_Fields>;
  sumDistinct?: Maybe<Questionnaire_Aggregated_Fields>;
};

export type Questionnaire_Aggregated_Count = {
  __typename?: 'questionnaire_aggregated_count';
  answer_group?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  instructions?: Maybe<Scalars['Int']>;
  question_sets?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Questionnaire_Aggregated_Fields = {
  __typename?: 'questionnaire_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Questionnaire_Conclusion = {
  __typename?: 'questionnaire_conclusion';
  content?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  questionnaire?: Maybe<Questionnaire>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type Questionnaire_ConclusionQuestionnaireArgs = {
  filter?: InputMaybe<Questionnaire_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Questionnaire_ConclusionUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Questionnaire_ConclusionUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Questionnaire_Conclusion_Aggregated = {
  __typename?: 'questionnaire_conclusion_aggregated';
  avg?: Maybe<Questionnaire_Conclusion_Aggregated_Fields>;
  avgDistinct?: Maybe<Questionnaire_Conclusion_Aggregated_Fields>;
  count?: Maybe<Questionnaire_Conclusion_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Questionnaire_Conclusion_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Questionnaire_Conclusion_Aggregated_Fields>;
  min?: Maybe<Questionnaire_Conclusion_Aggregated_Fields>;
  sum?: Maybe<Questionnaire_Conclusion_Aggregated_Fields>;
  sumDistinct?: Maybe<Questionnaire_Conclusion_Aggregated_Fields>;
};

export type Questionnaire_Conclusion_Aggregated_Count = {
  __typename?: 'questionnaire_conclusion_aggregated_count';
  content?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  questionnaire?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Questionnaire_Conclusion_Aggregated_Fields = {
  __typename?: 'questionnaire_conclusion_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  questionnaire?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Questionnaire_Conclusion_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Questionnaire_Conclusion_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Questionnaire_Conclusion_Filter>>>;
  content?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  questionnaire?: InputMaybe<Questionnaire_Filter>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Questionnaire_Conclusion_Mutated = {
  __typename?: 'questionnaire_conclusion_mutated';
  data?: Maybe<Questionnaire_Conclusion>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Questionnaire_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Questionnaire_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Questionnaire_Filter>>>;
  answer_group?: InputMaybe<Answer_Group_Filter>;
  answer_group_func?: InputMaybe<Count_Function_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  instructions?: InputMaybe<String_Filter_Operators>;
  question_sets?: InputMaybe<Questionnaire_Question_Set_Filter>;
  question_sets_func?: InputMaybe<Count_Function_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Questionnaire_Mutated = {
  __typename?: 'questionnaire_mutated';
  data?: Maybe<Questionnaire>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Questionnaire_Question_Set = {
  __typename?: 'questionnaire_question_set';
  id: Scalars['ID'];
  optional?: Maybe<Scalars['Boolean']>;
  question_set_id?: Maybe<Question_Set>;
  questionnaire_id?: Maybe<Questionnaire>;
};


export type Questionnaire_Question_SetQuestion_Set_IdArgs = {
  filter?: InputMaybe<Question_Set_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Questionnaire_Question_SetQuestionnaire_IdArgs = {
  filter?: InputMaybe<Questionnaire_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Questionnaire_Question_Set_Aggregated = {
  __typename?: 'questionnaire_question_set_aggregated';
  avg?: Maybe<Questionnaire_Question_Set_Aggregated_Fields>;
  avgDistinct?: Maybe<Questionnaire_Question_Set_Aggregated_Fields>;
  count?: Maybe<Questionnaire_Question_Set_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Questionnaire_Question_Set_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Questionnaire_Question_Set_Aggregated_Fields>;
  min?: Maybe<Questionnaire_Question_Set_Aggregated_Fields>;
  sum?: Maybe<Questionnaire_Question_Set_Aggregated_Fields>;
  sumDistinct?: Maybe<Questionnaire_Question_Set_Aggregated_Fields>;
};

export type Questionnaire_Question_Set_Aggregated_Count = {
  __typename?: 'questionnaire_question_set_aggregated_count';
  id?: Maybe<Scalars['Int']>;
  optional?: Maybe<Scalars['Int']>;
  question_set_id?: Maybe<Scalars['Int']>;
  questionnaire_id?: Maybe<Scalars['Int']>;
};

export type Questionnaire_Question_Set_Aggregated_Fields = {
  __typename?: 'questionnaire_question_set_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  question_set_id?: Maybe<Scalars['Float']>;
  questionnaire_id?: Maybe<Scalars['Float']>;
};

export type Questionnaire_Question_Set_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Questionnaire_Question_Set_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Questionnaire_Question_Set_Filter>>>;
  id?: InputMaybe<Number_Filter_Operators>;
  optional?: InputMaybe<Boolean_Filter_Operators>;
  question_set_id?: InputMaybe<Question_Set_Filter>;
  questionnaire_id?: InputMaybe<Questionnaire_Filter>;
};

export type Questionnaire_Question_Set_Mutated = {
  __typename?: 'questionnaire_question_set_mutated';
  data?: Maybe<Questionnaire_Question_Set>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

/** columns and relationships of "register_code" */
export type Register_Code = {
  __typename?: 'register_code';
  assigned_role?: Maybe<Scalars['String']>;
  assignee?: Maybe<Scalars['uuid']>;
  assigner: Scalars['uuid'];
  code: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  expire_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  used_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregated selection of "register_code" */
export type Register_Code_Aggregate = {
  __typename?: 'register_code_aggregate';
  aggregate?: Maybe<Register_Code_Aggregate_Fields>;
  nodes: Array<Register_Code>;
};

/** aggregate fields of "register_code" */
export type Register_Code_Aggregate_Fields = {
  __typename?: 'register_code_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Register_Code_Max_Fields>;
  min?: Maybe<Register_Code_Min_Fields>;
};


/** aggregate fields of "register_code" */
export type Register_Code_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Register_Code_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "register_code". All fields are combined with a logical 'AND'. */
export type Register_Code_Bool_Exp = {
  _and?: InputMaybe<Array<Register_Code_Bool_Exp>>;
  _not?: InputMaybe<Register_Code_Bool_Exp>;
  _or?: InputMaybe<Array<Register_Code_Bool_Exp>>;
  assigned_role?: InputMaybe<String_Comparison_Exp>;
  assignee?: InputMaybe<Uuid_Comparison_Exp>;
  assigner?: InputMaybe<Uuid_Comparison_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  expire_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  used_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "register_code" */
export enum Register_Code_Constraint {
  /** unique or primary key constraint on columns "assignee" */
  RegisterCodeAssigneeKey = 'register_code_assignee_key',
  /** unique or primary key constraint on columns "code" */
  RegisterCodeCodeKey = 'register_code_code_key',
  /** unique or primary key constraint on columns "id" */
  RegisterCodePkey = 'register_code_pkey'
}

/** input type for inserting data into table "register_code" */
export type Register_Code_Insert_Input = {
  assigned_role?: InputMaybe<Scalars['String']>;
  assignee?: InputMaybe<Scalars['uuid']>;
  assigner?: InputMaybe<Scalars['uuid']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  expire_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  used_at?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Register_Code_Max_Fields = {
  __typename?: 'register_code_max_fields';
  assigned_role?: Maybe<Scalars['String']>;
  assignee?: Maybe<Scalars['uuid']>;
  assigner?: Maybe<Scalars['uuid']>;
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  expire_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  used_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Register_Code_Min_Fields = {
  __typename?: 'register_code_min_fields';
  assigned_role?: Maybe<Scalars['String']>;
  assignee?: Maybe<Scalars['uuid']>;
  assigner?: Maybe<Scalars['uuid']>;
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  expire_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  used_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "register_code" */
export type Register_Code_Mutation_Response = {
  __typename?: 'register_code_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Register_Code>;
};

/** on_conflict condition type for table "register_code" */
export type Register_Code_On_Conflict = {
  constraint: Register_Code_Constraint;
  update_columns?: Array<Register_Code_Update_Column>;
  where?: InputMaybe<Register_Code_Bool_Exp>;
};

/** Ordering options when selecting data from "register_code". */
export type Register_Code_Order_By = {
  assigned_role?: InputMaybe<Order_By>;
  assignee?: InputMaybe<Order_By>;
  assigner?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  expire_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  used_at?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: register_code */
export type Register_Code_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "register_code" */
export enum Register_Code_Select_Column {
  /** column name */
  AssignedRole = 'assigned_role',
  /** column name */
  Assignee = 'assignee',
  /** column name */
  Assigner = 'assigner',
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Email = 'email',
  /** column name */
  ExpireAt = 'expire_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UsedAt = 'used_at',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "register_code" */
export type Register_Code_Set_Input = {
  assigned_role?: InputMaybe<Scalars['String']>;
  assignee?: InputMaybe<Scalars['uuid']>;
  assigner?: InputMaybe<Scalars['uuid']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  expire_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  used_at?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "register_code" */
export type Register_Code_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Register_Code_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Register_Code_Stream_Cursor_Value_Input = {
  assigned_role?: InputMaybe<Scalars['String']>;
  assignee?: InputMaybe<Scalars['uuid']>;
  assigner?: InputMaybe<Scalars['uuid']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  expire_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  used_at?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
};

/** update columns of table "register_code" */
export enum Register_Code_Update_Column {
  /** column name */
  AssignedRole = 'assigned_role',
  /** column name */
  Assignee = 'assignee',
  /** column name */
  Assigner = 'assigner',
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Email = 'email',
  /** column name */
  ExpireAt = 'expire_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UsedAt = 'used_at',
  /** column name */
  Username = 'username'
}

export type Register_Code_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Register_Code_Set_Input>;
  /** filter the rows which have to be updated */
  where: Register_Code_Bool_Exp;
};

/** columns and relationships of "rr_files" */
export type Rr_Files = {
  __typename?: 'rr_files';
  bucket: Scalars['String'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  file_name: Scalars['String'];
  /** An object relationship */
  heart_data: Heart_Data;
  heart_data_id: Scalars['uuid'];
  id: Scalars['uuid'];
  key: Scalars['String'];
  owner?: Maybe<User>;
  owner_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "rr_files" */
export type Rr_Files_Aggregate = {
  __typename?: 'rr_files_aggregate';
  aggregate?: Maybe<Rr_Files_Aggregate_Fields>;
  nodes: Array<Rr_Files>;
};

/** aggregate fields of "rr_files" */
export type Rr_Files_Aggregate_Fields = {
  __typename?: 'rr_files_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Rr_Files_Max_Fields>;
  min?: Maybe<Rr_Files_Min_Fields>;
};


/** aggregate fields of "rr_files" */
export type Rr_Files_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Rr_Files_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "rr_files". All fields are combined with a logical 'AND'. */
export type Rr_Files_Bool_Exp = {
  _and?: InputMaybe<Array<Rr_Files_Bool_Exp>>;
  _not?: InputMaybe<Rr_Files_Bool_Exp>;
  _or?: InputMaybe<Array<Rr_Files_Bool_Exp>>;
  bucket?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  file_name?: InputMaybe<String_Comparison_Exp>;
  heart_data?: InputMaybe<Heart_Data_Bool_Exp>;
  heart_data_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "rr_files" */
export enum Rr_Files_Constraint {
  /** unique or primary key constraint on columns "heart_data_id" */
  RrFilesHeartDataIdKey = 'rr_files_heart_data_id_key',
  /** unique or primary key constraint on columns "id" */
  RrFilesPkey = 'rr_files_pkey'
}

/** input type for inserting data into table "rr_files" */
export type Rr_Files_Insert_Input = {
  bucket?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  file_name?: InputMaybe<Scalars['String']>;
  heart_data?: InputMaybe<Heart_Data_Obj_Rel_Insert_Input>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Rr_Files_Max_Fields = {
  __typename?: 'rr_files_max_fields';
  bucket?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  file_name?: Maybe<Scalars['String']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  key?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Rr_Files_Min_Fields = {
  __typename?: 'rr_files_min_fields';
  bucket?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  file_name?: Maybe<Scalars['String']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  key?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "rr_files" */
export type Rr_Files_Mutation_Response = {
  __typename?: 'rr_files_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Rr_Files>;
};

/** input type for inserting object relation for remote table "rr_files" */
export type Rr_Files_Obj_Rel_Insert_Input = {
  data: Rr_Files_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Rr_Files_On_Conflict>;
};

/** on_conflict condition type for table "rr_files" */
export type Rr_Files_On_Conflict = {
  constraint: Rr_Files_Constraint;
  update_columns?: Array<Rr_Files_Update_Column>;
  where?: InputMaybe<Rr_Files_Bool_Exp>;
};

/** Ordering options when selecting data from "rr_files". */
export type Rr_Files_Order_By = {
  bucket?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  file_name?: InputMaybe<Order_By>;
  heart_data?: InputMaybe<Heart_Data_Order_By>;
  heart_data_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: rr_files */
export type Rr_Files_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "rr_files" */
export enum Rr_Files_Select_Column {
  /** column name */
  Bucket = 'bucket',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  FileName = 'file_name',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "rr_files" */
export type Rr_Files_Set_Input = {
  bucket?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  file_name?: InputMaybe<Scalars['String']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "rr_files" */
export type Rr_Files_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Rr_Files_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Rr_Files_Stream_Cursor_Value_Input = {
  bucket?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  file_name?: InputMaybe<Scalars['String']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "rr_files" */
export enum Rr_Files_Update_Column {
  /** column name */
  Bucket = 'bucket',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  FileName = 'file_name',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Rr_Files_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Rr_Files_Set_Input>;
  /** filter the rows which have to be updated */
  where: Rr_Files_Bool_Exp;
};

/** columns and relationships of "rr_metadata" */
export type Rr_Metadata = {
  __typename?: 'rr_metadata';
  created_at: Scalars['timestamptz'];
  heart_data_id: Scalars['uuid'];
  /** An object relationship */
  heart_datum: Heart_Data;
  id: Scalars['uuid'];
  max: Scalars['numeric'];
  mean: Scalars['numeric'];
  min: Scalars['numeric'];
  owner_id: Scalars['String'];
  rrs: Scalars['jsonb'];
  threshold: Scalars['Int'];
  total_filtered_rr: Scalars['Int'];
  total_rejected: Scalars['Int'];
  total_rr: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "rr_metadata" */
export type Rr_MetadataRrsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "rr_metadata" */
export type Rr_Metadata_Aggregate = {
  __typename?: 'rr_metadata_aggregate';
  aggregate?: Maybe<Rr_Metadata_Aggregate_Fields>;
  nodes: Array<Rr_Metadata>;
};

/** aggregate fields of "rr_metadata" */
export type Rr_Metadata_Aggregate_Fields = {
  __typename?: 'rr_metadata_aggregate_fields';
  avg?: Maybe<Rr_Metadata_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Rr_Metadata_Max_Fields>;
  min?: Maybe<Rr_Metadata_Min_Fields>;
  stddev?: Maybe<Rr_Metadata_Stddev_Fields>;
  stddev_pop?: Maybe<Rr_Metadata_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Rr_Metadata_Stddev_Samp_Fields>;
  sum?: Maybe<Rr_Metadata_Sum_Fields>;
  var_pop?: Maybe<Rr_Metadata_Var_Pop_Fields>;
  var_samp?: Maybe<Rr_Metadata_Var_Samp_Fields>;
  variance?: Maybe<Rr_Metadata_Variance_Fields>;
};


/** aggregate fields of "rr_metadata" */
export type Rr_Metadata_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Rr_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Rr_Metadata_Append_Input = {
  rrs?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Rr_Metadata_Avg_Fields = {
  __typename?: 'rr_metadata_avg_fields';
  max?: Maybe<Scalars['Float']>;
  mean?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  threshold?: Maybe<Scalars['Float']>;
  total_filtered_rr?: Maybe<Scalars['Float']>;
  total_rejected?: Maybe<Scalars['Float']>;
  total_rr?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "rr_metadata". All fields are combined with a logical 'AND'. */
export type Rr_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Rr_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Rr_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Rr_Metadata_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  heart_data_id?: InputMaybe<Uuid_Comparison_Exp>;
  heart_datum?: InputMaybe<Heart_Data_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  max?: InputMaybe<Numeric_Comparison_Exp>;
  mean?: InputMaybe<Numeric_Comparison_Exp>;
  min?: InputMaybe<Numeric_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  rrs?: InputMaybe<Jsonb_Comparison_Exp>;
  threshold?: InputMaybe<Int_Comparison_Exp>;
  total_filtered_rr?: InputMaybe<Int_Comparison_Exp>;
  total_rejected?: InputMaybe<Int_Comparison_Exp>;
  total_rr?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "rr_metadata" */
export enum Rr_Metadata_Constraint {
  /** unique or primary key constraint on columns "heart_data_id" */
  RrMetadataHeartDataIdKey = 'rr_metadata_heart_data_id_key',
  /** unique or primary key constraint on columns "id" */
  RrMetadataPkey = 'rr_metadata_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Rr_Metadata_Delete_At_Path_Input = {
  rrs?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Rr_Metadata_Delete_Elem_Input = {
  rrs?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Rr_Metadata_Delete_Key_Input = {
  rrs?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "rr_metadata" */
export type Rr_Metadata_Inc_Input = {
  max?: InputMaybe<Scalars['numeric']>;
  mean?: InputMaybe<Scalars['numeric']>;
  min?: InputMaybe<Scalars['numeric']>;
  threshold?: InputMaybe<Scalars['Int']>;
  total_filtered_rr?: InputMaybe<Scalars['Int']>;
  total_rejected?: InputMaybe<Scalars['Int']>;
  total_rr?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "rr_metadata" */
export type Rr_Metadata_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  heart_datum?: InputMaybe<Heart_Data_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  max?: InputMaybe<Scalars['numeric']>;
  mean?: InputMaybe<Scalars['numeric']>;
  min?: InputMaybe<Scalars['numeric']>;
  owner_id?: InputMaybe<Scalars['String']>;
  rrs?: InputMaybe<Scalars['jsonb']>;
  threshold?: InputMaybe<Scalars['Int']>;
  total_filtered_rr?: InputMaybe<Scalars['Int']>;
  total_rejected?: InputMaybe<Scalars['Int']>;
  total_rr?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Rr_Metadata_Max_Fields = {
  __typename?: 'rr_metadata_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  max?: Maybe<Scalars['numeric']>;
  mean?: Maybe<Scalars['numeric']>;
  min?: Maybe<Scalars['numeric']>;
  owner_id?: Maybe<Scalars['String']>;
  threshold?: Maybe<Scalars['Int']>;
  total_filtered_rr?: Maybe<Scalars['Int']>;
  total_rejected?: Maybe<Scalars['Int']>;
  total_rr?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Rr_Metadata_Min_Fields = {
  __typename?: 'rr_metadata_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  max?: Maybe<Scalars['numeric']>;
  mean?: Maybe<Scalars['numeric']>;
  min?: Maybe<Scalars['numeric']>;
  owner_id?: Maybe<Scalars['String']>;
  threshold?: Maybe<Scalars['Int']>;
  total_filtered_rr?: Maybe<Scalars['Int']>;
  total_rejected?: Maybe<Scalars['Int']>;
  total_rr?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "rr_metadata" */
export type Rr_Metadata_Mutation_Response = {
  __typename?: 'rr_metadata_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Rr_Metadata>;
};

/** input type for inserting object relation for remote table "rr_metadata" */
export type Rr_Metadata_Obj_Rel_Insert_Input = {
  data: Rr_Metadata_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Rr_Metadata_On_Conflict>;
};

/** on_conflict condition type for table "rr_metadata" */
export type Rr_Metadata_On_Conflict = {
  constraint: Rr_Metadata_Constraint;
  update_columns?: Array<Rr_Metadata_Update_Column>;
  where?: InputMaybe<Rr_Metadata_Bool_Exp>;
};

/** Ordering options when selecting data from "rr_metadata". */
export type Rr_Metadata_Order_By = {
  created_at?: InputMaybe<Order_By>;
  heart_data_id?: InputMaybe<Order_By>;
  heart_datum?: InputMaybe<Heart_Data_Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  mean?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  rrs?: InputMaybe<Order_By>;
  threshold?: InputMaybe<Order_By>;
  total_filtered_rr?: InputMaybe<Order_By>;
  total_rejected?: InputMaybe<Order_By>;
  total_rr?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: rr_metadata */
export type Rr_Metadata_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Rr_Metadata_Prepend_Input = {
  rrs?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "rr_metadata" */
export enum Rr_Metadata_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  Max = 'max',
  /** column name */
  Mean = 'mean',
  /** column name */
  Min = 'min',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Rrs = 'rrs',
  /** column name */
  Threshold = 'threshold',
  /** column name */
  TotalFilteredRr = 'total_filtered_rr',
  /** column name */
  TotalRejected = 'total_rejected',
  /** column name */
  TotalRr = 'total_rr',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "rr_metadata" */
export type Rr_Metadata_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  max?: InputMaybe<Scalars['numeric']>;
  mean?: InputMaybe<Scalars['numeric']>;
  min?: InputMaybe<Scalars['numeric']>;
  owner_id?: InputMaybe<Scalars['String']>;
  rrs?: InputMaybe<Scalars['jsonb']>;
  threshold?: InputMaybe<Scalars['Int']>;
  total_filtered_rr?: InputMaybe<Scalars['Int']>;
  total_rejected?: InputMaybe<Scalars['Int']>;
  total_rr?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Rr_Metadata_Stddev_Fields = {
  __typename?: 'rr_metadata_stddev_fields';
  max?: Maybe<Scalars['Float']>;
  mean?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  threshold?: Maybe<Scalars['Float']>;
  total_filtered_rr?: Maybe<Scalars['Float']>;
  total_rejected?: Maybe<Scalars['Float']>;
  total_rr?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Rr_Metadata_Stddev_Pop_Fields = {
  __typename?: 'rr_metadata_stddev_pop_fields';
  max?: Maybe<Scalars['Float']>;
  mean?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  threshold?: Maybe<Scalars['Float']>;
  total_filtered_rr?: Maybe<Scalars['Float']>;
  total_rejected?: Maybe<Scalars['Float']>;
  total_rr?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Rr_Metadata_Stddev_Samp_Fields = {
  __typename?: 'rr_metadata_stddev_samp_fields';
  max?: Maybe<Scalars['Float']>;
  mean?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  threshold?: Maybe<Scalars['Float']>;
  total_filtered_rr?: Maybe<Scalars['Float']>;
  total_rejected?: Maybe<Scalars['Float']>;
  total_rr?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "rr_metadata" */
export type Rr_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Rr_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Rr_Metadata_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  max?: InputMaybe<Scalars['numeric']>;
  mean?: InputMaybe<Scalars['numeric']>;
  min?: InputMaybe<Scalars['numeric']>;
  owner_id?: InputMaybe<Scalars['String']>;
  rrs?: InputMaybe<Scalars['jsonb']>;
  threshold?: InputMaybe<Scalars['Int']>;
  total_filtered_rr?: InputMaybe<Scalars['Int']>;
  total_rejected?: InputMaybe<Scalars['Int']>;
  total_rr?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Rr_Metadata_Sum_Fields = {
  __typename?: 'rr_metadata_sum_fields';
  max?: Maybe<Scalars['numeric']>;
  mean?: Maybe<Scalars['numeric']>;
  min?: Maybe<Scalars['numeric']>;
  threshold?: Maybe<Scalars['Int']>;
  total_filtered_rr?: Maybe<Scalars['Int']>;
  total_rejected?: Maybe<Scalars['Int']>;
  total_rr?: Maybe<Scalars['Int']>;
};

/** update columns of table "rr_metadata" */
export enum Rr_Metadata_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  Max = 'max',
  /** column name */
  Mean = 'mean',
  /** column name */
  Min = 'min',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Rrs = 'rrs',
  /** column name */
  Threshold = 'threshold',
  /** column name */
  TotalFilteredRr = 'total_filtered_rr',
  /** column name */
  TotalRejected = 'total_rejected',
  /** column name */
  TotalRr = 'total_rr',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Rr_Metadata_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Rr_Metadata_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Rr_Metadata_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Rr_Metadata_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Rr_Metadata_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Rr_Metadata_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Rr_Metadata_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Rr_Metadata_Set_Input>;
  /** filter the rows which have to be updated */
  where: Rr_Metadata_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Rr_Metadata_Var_Pop_Fields = {
  __typename?: 'rr_metadata_var_pop_fields';
  max?: Maybe<Scalars['Float']>;
  mean?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  threshold?: Maybe<Scalars['Float']>;
  total_filtered_rr?: Maybe<Scalars['Float']>;
  total_rejected?: Maybe<Scalars['Float']>;
  total_rr?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Rr_Metadata_Var_Samp_Fields = {
  __typename?: 'rr_metadata_var_samp_fields';
  max?: Maybe<Scalars['Float']>;
  mean?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  threshold?: Maybe<Scalars['Float']>;
  total_filtered_rr?: Maybe<Scalars['Float']>;
  total_rejected?: Maybe<Scalars['Float']>;
  total_rr?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Rr_Metadata_Variance_Fields = {
  __typename?: 'rr_metadata_variance_fields';
  max?: Maybe<Scalars['Float']>;
  mean?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  threshold?: Maybe<Scalars['Float']>;
  total_filtered_rr?: Maybe<Scalars['Float']>;
  total_rejected?: Maybe<Scalars['Float']>;
  total_rr?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['smallint']>;
  _gt?: InputMaybe<Scalars['smallint']>;
  _gte?: InputMaybe<Scalars['smallint']>;
  _in?: InputMaybe<Array<Scalars['smallint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['smallint']>;
  _lte?: InputMaybe<Scalars['smallint']>;
  _neq?: InputMaybe<Scalars['smallint']>;
  _nin?: InputMaybe<Array<Scalars['smallint']>>;
};

export type String_Filter_Operators = {
  _contains?: InputMaybe<Scalars['String']>;
  _empty?: InputMaybe<Scalars['Boolean']>;
  _ends_with?: InputMaybe<Scalars['String']>;
  _eq?: InputMaybe<Scalars['String']>;
  _icontains?: InputMaybe<Scalars['String']>;
  _iends_with?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _istarts_with?: InputMaybe<Scalars['String']>;
  _ncontains?: InputMaybe<Scalars['String']>;
  _nempty?: InputMaybe<Scalars['Boolean']>;
  _nends_with?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _niends_with?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _nistarts_with?: InputMaybe<Scalars['String']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _nstarts_with?: InputMaybe<Scalars['String']>;
  _null?: InputMaybe<Scalars['Boolean']>;
  _starts_with?: InputMaybe<Scalars['String']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  BG_Raw_Scores_mutated?: Maybe<Bg_Raw_Scores_Mutated>;
  Disclaimer_Acknowledgement_mutated?: Maybe<Disclaimer_Acknowledgement_Mutated>;
  Disclaimers_mutated?: Maybe<Disclaimers_Mutated>;
  Feature_Requests_mutated?: Maybe<Feature_Requests_Mutated>;
  Gradient_Colour_mutated?: Maybe<Gradient_Colour_Mutated>;
  Repeat_Colour_mutated?: Maybe<Repeat_Colour_Mutated>;
  Solution_Category_mutated?: Maybe<Solution_Category_Mutated>;
  Solution_mutated?: Maybe<Solution_Mutated>;
  /** fetch data from the table: "adrenal_function_urine_test" */
  adrenal_function_urine_test: Array<Adrenal_Function_Urine_Test>;
  /** fetch aggregated fields from the table: "adrenal_function_urine_test" */
  adrenal_function_urine_test_aggregate: Adrenal_Function_Urine_Test_Aggregate;
  /** fetch data from the table: "adrenal_function_urine_test" using primary key columns */
  adrenal_function_urine_test_by_pk?: Maybe<Adrenal_Function_Urine_Test>;
  /** fetch data from the table in a streaming manner: "adrenal_function_urine_test" */
  adrenal_function_urine_test_stream: Array<Adrenal_Function_Urine_Test>;
  answer_group_mutated?: Maybe<Answer_Group_Mutated>;
  answer_mutated?: Maybe<Answer_Mutated>;
  answer_set_mutated?: Maybe<Answer_Set_Mutated>;
  bar_gradients_Gradient_Colour_mutated?: Maybe<Bar_Gradients_Gradient_Colour_Mutated>;
  bar_gradients_mutated?: Maybe<Bar_Gradients_Mutated>;
  bg_parameters_mutated?: Maybe<Bg_Parameters_Mutated>;
  /** fetch data from the table: "brain_spectrum" */
  brain_spectrum: Array<Brain_Spectrum>;
  /** fetch aggregated fields from the table: "brain_spectrum" */
  brain_spectrum_aggregate: Brain_Spectrum_Aggregate;
  /** fetch data from the table: "brain_spectrum" using primary key columns */
  brain_spectrum_by_pk?: Maybe<Brain_Spectrum>;
  /** fetch data from the table in a streaming manner: "brain_spectrum" */
  brain_spectrum_stream: Array<Brain_Spectrum>;
  descriptions_mutated?: Maybe<Descriptions_Mutated>;
  /** fetch data from the table: "device" */
  device: Array<Device>;
  /** fetch aggregated fields from the table: "device" */
  device_aggregate: Device_Aggregate;
  /** fetch data from the table: "device_assignment" */
  device_assignment: Array<Device_Assignment>;
  /** fetch aggregated fields from the table: "device_assignment" */
  device_assignment_aggregate: Device_Assignment_Aggregate;
  /** fetch data from the table: "device_assignment" using primary key columns */
  device_assignment_by_pk?: Maybe<Device_Assignment>;
  /** fetch data from the table in a streaming manner: "device_assignment" */
  device_assignment_stream: Array<Device_Assignment>;
  /** fetch data from the table: "device" using primary key columns */
  device_by_pk?: Maybe<Device>;
  /** fetch data from the table: "device_location" */
  device_location: Array<Device_Location>;
  /** fetch aggregated fields from the table: "device_location" */
  device_location_aggregate: Device_Location_Aggregate;
  /** fetch data from the table: "device_location" using primary key columns */
  device_location_by_pk?: Maybe<Device_Location>;
  /** fetch data from the table in a streaming manner: "device_location" */
  device_location_stream: Array<Device_Location>;
  /** fetch data from the table in a streaming manner: "device" */
  device_stream: Array<Device>;
  /** fetch data from the table: "device_usage" */
  device_usage: Array<Device_Usage>;
  /** fetch aggregated fields from the table: "device_usage" */
  device_usage_aggregate: Device_Usage_Aggregate;
  /** fetch data from the table: "device_usage" using primary key columns */
  device_usage_by_pk?: Maybe<Device_Usage>;
  /** fetch data from the table in a streaming manner: "device_usage" */
  device_usage_stream: Array<Device_Usage>;
  directus_access_mutated?: Maybe<Directus_Access_Mutated>;
  directus_activity_mutated?: Maybe<Directus_Activity_Mutated>;
  directus_comments_mutated?: Maybe<Directus_Comments_Mutated>;
  directus_dashboards_mutated?: Maybe<Directus_Dashboards_Mutated>;
  directus_files_mutated?: Maybe<Directus_Files_Mutated>;
  directus_flows_mutated?: Maybe<Directus_Flows_Mutated>;
  directus_folders_mutated?: Maybe<Directus_Folders_Mutated>;
  directus_notifications_mutated?: Maybe<Directus_Notifications_Mutated>;
  directus_operations_mutated?: Maybe<Directus_Operations_Mutated>;
  directus_panels_mutated?: Maybe<Directus_Panels_Mutated>;
  directus_permissions_mutated?: Maybe<Directus_Permissions_Mutated>;
  directus_policies_mutated?: Maybe<Directus_Policies_Mutated>;
  directus_presets_mutated?: Maybe<Directus_Presets_Mutated>;
  directus_revisions_mutated?: Maybe<Directus_Revisions_Mutated>;
  directus_roles_mutated?: Maybe<Directus_Roles_Mutated>;
  directus_settings_mutated?: Maybe<Directus_Settings_Mutated>;
  directus_shares_mutated?: Maybe<Directus_Shares_Mutated>;
  directus_translations_mutated?: Maybe<Directus_Translations_Mutated>;
  directus_users_mutated?: Maybe<Directus_Users_Mutated>;
  directus_versions_mutated?: Maybe<Directus_Versions_Mutated>;
  directus_webhooks_mutated?: Maybe<Directus_Webhooks_Mutated>;
  /** fetch data from the table: "ecg_files" */
  ecg_files: Array<Ecg_Files>;
  /** fetch aggregated fields from the table: "ecg_files" */
  ecg_files_aggregate: Ecg_Files_Aggregate;
  /** fetch data from the table: "ecg_files" using primary key columns */
  ecg_files_by_pk?: Maybe<Ecg_Files>;
  /** fetch data from the table in a streaming manner: "ecg_files" */
  ecg_files_stream: Array<Ecg_Files>;
  explanation_mutated?: Maybe<Explanation_Mutated>;
  /** fetch data from the table: "followers" */
  followers: Array<Followers>;
  /** fetch aggregated fields from the table: "followers" */
  followers_aggregate: Followers_Aggregate;
  /** fetch data from the table: "followers" using primary key columns */
  followers_by_pk?: Maybe<Followers>;
  /** fetch data from the table in a streaming manner: "followers" */
  followers_stream: Array<Followers>;
  /** execute function "get_heart_data_answers" which returns "v_question_answer" */
  get_heart_data_answers: Array<V_Question_Answer>;
  /** execute function "get_heart_data_answers" and query aggregates on result of table type "v_question_answer" */
  get_heart_data_answers_aggregate: V_Question_Answer_Aggregate;
  global_notifications_mutated?: Maybe<Global_Notifications_Mutated>;
  /** fetch data from the table: "heart_data" */
  heart_data: Array<Heart_Data>;
  /** fetch aggregated fields from the table: "heart_data" */
  heart_data_aggregate: Heart_Data_Aggregate;
  /** fetch data from the table: "heart_data" using primary key columns */
  heart_data_by_pk?: Maybe<Heart_Data>;
  /** fetch data from the table: "heart_data_progress_type" */
  heart_data_progress_type: Array<Heart_Data_Progress_Type>;
  /** fetch aggregated fields from the table: "heart_data_progress_type" */
  heart_data_progress_type_aggregate: Heart_Data_Progress_Type_Aggregate;
  /** fetch data from the table: "heart_data_progress_type" using primary key columns */
  heart_data_progress_type_by_pk?: Maybe<Heart_Data_Progress_Type>;
  /** fetch data from the table in a streaming manner: "heart_data_progress_type" */
  heart_data_progress_type_stream: Array<Heart_Data_Progress_Type>;
  /** fetch data from the table in a streaming manner: "heart_data" */
  heart_data_stream: Array<Heart_Data>;
  /** fetch data from the table: "heart_data_tag" */
  heart_data_tag: Array<Heart_Data_Tag>;
  /** fetch aggregated fields from the table: "heart_data_tag" */
  heart_data_tag_aggregate: Heart_Data_Tag_Aggregate;
  /** fetch data from the table: "heart_data_tag" using primary key columns */
  heart_data_tag_by_pk?: Maybe<Heart_Data_Tag>;
  /** fetch data from the table in a streaming manner: "heart_data_tag" */
  heart_data_tag_stream: Array<Heart_Data_Tag>;
  /** An array relationship */
  identities: Array<Identities>;
  /** An aggregate relationship */
  identities_aggregate: Identities_Aggregate;
  /** fetch data from the table: "identities" using primary key columns */
  identities_by_pk?: Maybe<Identities>;
  /** fetch data from the table in a streaming manner: "identities" */
  identities_stream: Array<Identities>;
  match_mutated?: Maybe<Match_Mutated>;
  /** fetch data from the table: "note" */
  note: Array<Note>;
  /** fetch aggregated fields from the table: "note" */
  note_aggregate: Note_Aggregate;
  /** fetch data from the table: "note" using primary key columns */
  note_by_pk?: Maybe<Note>;
  /** fetch data from the table in a streaming manner: "note" */
  note_stream: Array<Note>;
  option_group_mutated?: Maybe<Option_Group_Mutated>;
  option_mutated?: Maybe<Option_Mutated>;
  /** fetch data from the table: "oxidative_stress_test" */
  oxidative_stress_test: Array<Oxidative_Stress_Test>;
  /** fetch aggregated fields from the table: "oxidative_stress_test" */
  oxidative_stress_test_aggregate: Oxidative_Stress_Test_Aggregate;
  /** fetch data from the table: "oxidative_stress_test" using primary key columns */
  oxidative_stress_test_by_pk?: Maybe<Oxidative_Stress_Test>;
  /** fetch data from the table in a streaming manner: "oxidative_stress_test" */
  oxidative_stress_test_stream: Array<Oxidative_Stress_Test>;
  question_mutated?: Maybe<Question_Mutated>;
  question_set_mutated?: Maybe<Question_Set_Mutated>;
  questionnaire_conclusion_mutated?: Maybe<Questionnaire_Conclusion_Mutated>;
  questionnaire_mutated?: Maybe<Questionnaire_Mutated>;
  questionnaire_question_set_mutated?: Maybe<Questionnaire_Question_Set_Mutated>;
  /** fetch data from the table: "register_code" */
  register_code: Array<Register_Code>;
  /** fetch aggregated fields from the table: "register_code" */
  register_code_aggregate: Register_Code_Aggregate;
  /** fetch data from the table: "register_code" using primary key columns */
  register_code_by_pk?: Maybe<Register_Code>;
  /** fetch data from the table in a streaming manner: "register_code" */
  register_code_stream: Array<Register_Code>;
  /** fetch data from the table: "rr_files" */
  rr_files: Array<Rr_Files>;
  /** fetch aggregated fields from the table: "rr_files" */
  rr_files_aggregate: Rr_Files_Aggregate;
  /** fetch data from the table: "rr_files" using primary key columns */
  rr_files_by_pk?: Maybe<Rr_Files>;
  /** fetch data from the table in a streaming manner: "rr_files" */
  rr_files_stream: Array<Rr_Files>;
  /** fetch data from the table: "rr_metadata" */
  rr_metadata: Array<Rr_Metadata>;
  /** fetch aggregated fields from the table: "rr_metadata" */
  rr_metadata_aggregate: Rr_Metadata_Aggregate;
  /** fetch data from the table: "rr_metadata" using primary key columns */
  rr_metadata_by_pk?: Maybe<Rr_Metadata>;
  /** fetch data from the table in a streaming manner: "rr_metadata" */
  rr_metadata_stream: Array<Rr_Metadata>;
  /** fetch data from the table: "survey" */
  survey: Array<Survey>;
  /** fetch aggregated fields from the table: "survey" */
  survey_aggregate: Survey_Aggregate;
  /** fetch data from the table: "survey" using primary key columns */
  survey_by_pk?: Maybe<Survey>;
  /** fetch data from the table in a streaming manner: "survey" */
  survey_stream: Array<Survey>;
  /** fetch data from the table: "tag" */
  tag: Array<Tag>;
  /** fetch aggregated fields from the table: "tag" */
  tag_aggregate: Tag_Aggregate;
  /** fetch data from the table: "tag" using primary key columns */
  tag_by_pk?: Maybe<Tag>;
  /** fetch data from the table in a streaming manner: "tag" */
  tag_stream: Array<Tag>;
  tutorials_mutated?: Maybe<Tutorials_Mutated>;
  /** fetch data from the table: "user_metadata" */
  user_metadata: Array<User_Metadata>;
  /** fetch aggregated fields from the table: "user_metadata" */
  user_metadata_aggregate: User_Metadata_Aggregate;
  /** fetch data from the table: "user_metadata" using primary key columns */
  user_metadata_by_pk?: Maybe<User_Metadata>;
  /** fetch data from the table in a streaming manner: "user_metadata" */
  user_metadata_stream: Array<User_Metadata>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
  /** fetch data from the table: "v_answer" */
  v_answer: Array<V_Answer>;
  /** fetch aggregated fields from the table: "v_answer" */
  v_answer_aggregate: V_Answer_Aggregate;
  /** fetch data from the table: "v_answer" using primary key columns */
  v_answer_by_pk?: Maybe<V_Answer>;
  /** fetch data from the table in a streaming manner: "v_answer" */
  v_answer_stream: Array<V_Answer>;
  /** fetch data from the table: "v_question" */
  v_question: Array<V_Question>;
  /** fetch aggregated fields from the table: "v_question" */
  v_question_aggregate: V_Question_Aggregate;
  /** fetch data from the table: "v_question_answer" */
  v_question_answer: Array<V_Question_Answer>;
  /** fetch aggregated fields from the table: "v_question_answer" */
  v_question_answer_aggregate: V_Question_Answer_Aggregate;
  /** fetch data from the table: "v_question_answer" using primary key columns */
  v_question_answer_by_pk?: Maybe<V_Question_Answer>;
  /** fetch data from the table in a streaming manner: "v_question_answer" */
  v_question_answer_stream: Array<V_Question_Answer>;
  /** fetch data from the table: "v_question" using primary key columns */
  v_question_by_pk?: Maybe<V_Question>;
  /** fetch data from the table in a streaming manner: "v_question" */
  v_question_stream: Array<V_Question>;
  values_mutated?: Maybe<Values_Mutated>;
  /** fetch data from the table: "whole_body_comp" */
  whole_body_comp: Array<Whole_Body_Comp>;
  /** fetch aggregated fields from the table: "whole_body_comp" */
  whole_body_comp_aggregate: Whole_Body_Comp_Aggregate;
  /** fetch data from the table: "whole_body_comp" using primary key columns */
  whole_body_comp_by_pk?: Maybe<Whole_Body_Comp>;
  /** fetch data from the table in a streaming manner: "whole_body_comp" */
  whole_body_comp_stream: Array<Whole_Body_Comp>;
};


export type Subscription_RootBg_Raw_Scores_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDisclaimer_Acknowledgement_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDisclaimers_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootFeature_Requests_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootGradient_Colour_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootRepeat_Colour_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootSolution_Category_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootSolution_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootAdrenal_Function_Urine_TestArgs = {
  distinct_on?: InputMaybe<Array<Adrenal_Function_Urine_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Adrenal_Function_Urine_Test_Order_By>>;
  where?: InputMaybe<Adrenal_Function_Urine_Test_Bool_Exp>;
};


export type Subscription_RootAdrenal_Function_Urine_Test_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Adrenal_Function_Urine_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Adrenal_Function_Urine_Test_Order_By>>;
  where?: InputMaybe<Adrenal_Function_Urine_Test_Bool_Exp>;
};


export type Subscription_RootAdrenal_Function_Urine_Test_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAdrenal_Function_Urine_Test_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Adrenal_Function_Urine_Test_Stream_Cursor_Input>>;
  where?: InputMaybe<Adrenal_Function_Urine_Test_Bool_Exp>;
};


export type Subscription_RootAnswer_Group_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootAnswer_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootAnswer_Set_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootBar_Gradients_Gradient_Colour_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootBar_Gradients_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootBg_Parameters_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootBrain_SpectrumArgs = {
  distinct_on?: InputMaybe<Array<Brain_Spectrum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brain_Spectrum_Order_By>>;
  where?: InputMaybe<Brain_Spectrum_Bool_Exp>;
};


export type Subscription_RootBrain_Spectrum_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Brain_Spectrum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brain_Spectrum_Order_By>>;
  where?: InputMaybe<Brain_Spectrum_Bool_Exp>;
};


export type Subscription_RootBrain_Spectrum_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootBrain_Spectrum_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Brain_Spectrum_Stream_Cursor_Input>>;
  where?: InputMaybe<Brain_Spectrum_Bool_Exp>;
};


export type Subscription_RootDescriptions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDeviceArgs = {
  distinct_on?: InputMaybe<Array<Device_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Order_By>>;
  where?: InputMaybe<Device_Bool_Exp>;
};


export type Subscription_RootDevice_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Device_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Order_By>>;
  where?: InputMaybe<Device_Bool_Exp>;
};


export type Subscription_RootDevice_AssignmentArgs = {
  distinct_on?: InputMaybe<Array<Device_Assignment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Assignment_Order_By>>;
  where?: InputMaybe<Device_Assignment_Bool_Exp>;
};


export type Subscription_RootDevice_Assignment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Device_Assignment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Assignment_Order_By>>;
  where?: InputMaybe<Device_Assignment_Bool_Exp>;
};


export type Subscription_RootDevice_Assignment_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootDevice_Assignment_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Device_Assignment_Stream_Cursor_Input>>;
  where?: InputMaybe<Device_Assignment_Bool_Exp>;
};


export type Subscription_RootDevice_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootDevice_LocationArgs = {
  distinct_on?: InputMaybe<Array<Device_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Location_Order_By>>;
  where?: InputMaybe<Device_Location_Bool_Exp>;
};


export type Subscription_RootDevice_Location_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Device_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Location_Order_By>>;
  where?: InputMaybe<Device_Location_Bool_Exp>;
};


export type Subscription_RootDevice_Location_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootDevice_Location_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Device_Location_Stream_Cursor_Input>>;
  where?: InputMaybe<Device_Location_Bool_Exp>;
};


export type Subscription_RootDevice_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Device_Stream_Cursor_Input>>;
  where?: InputMaybe<Device_Bool_Exp>;
};


export type Subscription_RootDevice_UsageArgs = {
  distinct_on?: InputMaybe<Array<Device_Usage_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Usage_Order_By>>;
  where?: InputMaybe<Device_Usage_Bool_Exp>;
};


export type Subscription_RootDevice_Usage_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Device_Usage_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Device_Usage_Order_By>>;
  where?: InputMaybe<Device_Usage_Bool_Exp>;
};


export type Subscription_RootDevice_Usage_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootDevice_Usage_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Device_Usage_Stream_Cursor_Input>>;
  where?: InputMaybe<Device_Usage_Bool_Exp>;
};


export type Subscription_RootDirectus_Access_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Activity_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Comments_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Dashboards_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Files_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Flows_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Folders_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Notifications_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Operations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Panels_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Permissions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Policies_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Presets_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Revisions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Roles_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Settings_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Shares_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Translations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Users_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Versions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootDirectus_Webhooks_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootEcg_FilesArgs = {
  distinct_on?: InputMaybe<Array<Ecg_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ecg_Files_Order_By>>;
  where?: InputMaybe<Ecg_Files_Bool_Exp>;
};


export type Subscription_RootEcg_Files_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ecg_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ecg_Files_Order_By>>;
  where?: InputMaybe<Ecg_Files_Bool_Exp>;
};


export type Subscription_RootEcg_Files_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEcg_Files_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Ecg_Files_Stream_Cursor_Input>>;
  where?: InputMaybe<Ecg_Files_Bool_Exp>;
};


export type Subscription_RootExplanation_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootFollowersArgs = {
  distinct_on?: InputMaybe<Array<Followers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Followers_Order_By>>;
  where?: InputMaybe<Followers_Bool_Exp>;
};


export type Subscription_RootFollowers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Followers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Followers_Order_By>>;
  where?: InputMaybe<Followers_Bool_Exp>;
};


export type Subscription_RootFollowers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootFollowers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Followers_Stream_Cursor_Input>>;
  where?: InputMaybe<Followers_Bool_Exp>;
};


export type Subscription_RootGet_Heart_Data_AnswersArgs = {
  args: Get_Heart_Data_Answers_Args;
  distinct_on?: InputMaybe<Array<V_Question_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Answer_Order_By>>;
  where?: InputMaybe<V_Question_Answer_Bool_Exp>;
};


export type Subscription_RootGet_Heart_Data_Answers_AggregateArgs = {
  args: Get_Heart_Data_Answers_Args;
  distinct_on?: InputMaybe<Array<V_Question_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Answer_Order_By>>;
  where?: InputMaybe<V_Question_Answer_Bool_Exp>;
};


export type Subscription_RootGlobal_Notifications_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootHeart_DataArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Order_By>>;
  where?: InputMaybe<Heart_Data_Bool_Exp>;
};


export type Subscription_RootHeart_Data_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Order_By>>;
  where?: InputMaybe<Heart_Data_Bool_Exp>;
};


export type Subscription_RootHeart_Data_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootHeart_Data_Progress_TypeArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Progress_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Progress_Type_Order_By>>;
  where?: InputMaybe<Heart_Data_Progress_Type_Bool_Exp>;
};


export type Subscription_RootHeart_Data_Progress_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Progress_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Progress_Type_Order_By>>;
  where?: InputMaybe<Heart_Data_Progress_Type_Bool_Exp>;
};


export type Subscription_RootHeart_Data_Progress_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootHeart_Data_Progress_Type_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Heart_Data_Progress_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Heart_Data_Progress_Type_Bool_Exp>;
};


export type Subscription_RootHeart_Data_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Heart_Data_Stream_Cursor_Input>>;
  where?: InputMaybe<Heart_Data_Bool_Exp>;
};


export type Subscription_RootHeart_Data_TagArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Tag_Order_By>>;
  where?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
};


export type Subscription_RootHeart_Data_Tag_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Tag_Order_By>>;
  where?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
};


export type Subscription_RootHeart_Data_Tag_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootHeart_Data_Tag_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Heart_Data_Tag_Stream_Cursor_Input>>;
  where?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
};


export type Subscription_RootIdentitiesArgs = {
  distinct_on?: InputMaybe<Array<Identities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identities_Order_By>>;
  where?: InputMaybe<Identities_Bool_Exp>;
};


export type Subscription_RootIdentities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Identities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identities_Order_By>>;
  where?: InputMaybe<Identities_Bool_Exp>;
};


export type Subscription_RootIdentities_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootIdentities_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Identities_Stream_Cursor_Input>>;
  where?: InputMaybe<Identities_Bool_Exp>;
};


export type Subscription_RootMatch_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootNoteArgs = {
  distinct_on?: InputMaybe<Array<Note_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Note_Order_By>>;
  where?: InputMaybe<Note_Bool_Exp>;
};


export type Subscription_RootNote_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Note_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Note_Order_By>>;
  where?: InputMaybe<Note_Bool_Exp>;
};


export type Subscription_RootNote_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootNote_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Note_Stream_Cursor_Input>>;
  where?: InputMaybe<Note_Bool_Exp>;
};


export type Subscription_RootOption_Group_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootOption_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootOxidative_Stress_TestArgs = {
  distinct_on?: InputMaybe<Array<Oxidative_Stress_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Oxidative_Stress_Test_Order_By>>;
  where?: InputMaybe<Oxidative_Stress_Test_Bool_Exp>;
};


export type Subscription_RootOxidative_Stress_Test_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Oxidative_Stress_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Oxidative_Stress_Test_Order_By>>;
  where?: InputMaybe<Oxidative_Stress_Test_Bool_Exp>;
};


export type Subscription_RootOxidative_Stress_Test_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootOxidative_Stress_Test_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Oxidative_Stress_Test_Stream_Cursor_Input>>;
  where?: InputMaybe<Oxidative_Stress_Test_Bool_Exp>;
};


export type Subscription_RootQuestion_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootQuestion_Set_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootQuestionnaire_Conclusion_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootQuestionnaire_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootQuestionnaire_Question_Set_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootRegister_CodeArgs = {
  distinct_on?: InputMaybe<Array<Register_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Register_Code_Order_By>>;
  where?: InputMaybe<Register_Code_Bool_Exp>;
};


export type Subscription_RootRegister_Code_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Register_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Register_Code_Order_By>>;
  where?: InputMaybe<Register_Code_Bool_Exp>;
};


export type Subscription_RootRegister_Code_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootRegister_Code_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Register_Code_Stream_Cursor_Input>>;
  where?: InputMaybe<Register_Code_Bool_Exp>;
};


export type Subscription_RootRr_FilesArgs = {
  distinct_on?: InputMaybe<Array<Rr_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rr_Files_Order_By>>;
  where?: InputMaybe<Rr_Files_Bool_Exp>;
};


export type Subscription_RootRr_Files_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rr_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rr_Files_Order_By>>;
  where?: InputMaybe<Rr_Files_Bool_Exp>;
};


export type Subscription_RootRr_Files_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootRr_Files_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Rr_Files_Stream_Cursor_Input>>;
  where?: InputMaybe<Rr_Files_Bool_Exp>;
};


export type Subscription_RootRr_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Rr_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rr_Metadata_Order_By>>;
  where?: InputMaybe<Rr_Metadata_Bool_Exp>;
};


export type Subscription_RootRr_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rr_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rr_Metadata_Order_By>>;
  where?: InputMaybe<Rr_Metadata_Bool_Exp>;
};


export type Subscription_RootRr_Metadata_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootRr_Metadata_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Rr_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Rr_Metadata_Bool_Exp>;
};


export type Subscription_RootSurveyArgs = {
  distinct_on?: InputMaybe<Array<Survey_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Survey_Order_By>>;
  where?: InputMaybe<Survey_Bool_Exp>;
};


export type Subscription_RootSurvey_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Survey_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Survey_Order_By>>;
  where?: InputMaybe<Survey_Bool_Exp>;
};


export type Subscription_RootSurvey_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootSurvey_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Survey_Stream_Cursor_Input>>;
  where?: InputMaybe<Survey_Bool_Exp>;
};


export type Subscription_RootTagArgs = {
  distinct_on?: InputMaybe<Array<Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tag_Order_By>>;
  where?: InputMaybe<Tag_Bool_Exp>;
};


export type Subscription_RootTag_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tag_Order_By>>;
  where?: InputMaybe<Tag_Bool_Exp>;
};


export type Subscription_RootTag_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootTag_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Tag_Stream_Cursor_Input>>;
  where?: InputMaybe<Tag_Bool_Exp>;
};


export type Subscription_RootTutorials_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootUser_MetadataArgs = {
  distinct_on?: InputMaybe<Array<User_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Metadata_Order_By>>;
  where?: InputMaybe<User_Metadata_Bool_Exp>;
};


export type Subscription_RootUser_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Metadata_Order_By>>;
  where?: InputMaybe<User_Metadata_Bool_Exp>;
};


export type Subscription_RootUser_Metadata_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUser_Metadata_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Metadata_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootV_AnswerArgs = {
  distinct_on?: InputMaybe<Array<V_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Answer_Order_By>>;
  where?: InputMaybe<V_Answer_Bool_Exp>;
};


export type Subscription_RootV_Answer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<V_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Answer_Order_By>>;
  where?: InputMaybe<V_Answer_Bool_Exp>;
};


export type Subscription_RootV_Answer_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootV_Answer_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<V_Answer_Stream_Cursor_Input>>;
  where?: InputMaybe<V_Answer_Bool_Exp>;
};


export type Subscription_RootV_QuestionArgs = {
  distinct_on?: InputMaybe<Array<V_Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Order_By>>;
  where?: InputMaybe<V_Question_Bool_Exp>;
};


export type Subscription_RootV_Question_AggregateArgs = {
  distinct_on?: InputMaybe<Array<V_Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Order_By>>;
  where?: InputMaybe<V_Question_Bool_Exp>;
};


export type Subscription_RootV_Question_AnswerArgs = {
  distinct_on?: InputMaybe<Array<V_Question_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Answer_Order_By>>;
  where?: InputMaybe<V_Question_Answer_Bool_Exp>;
};


export type Subscription_RootV_Question_Answer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<V_Question_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<V_Question_Answer_Order_By>>;
  where?: InputMaybe<V_Question_Answer_Bool_Exp>;
};


export type Subscription_RootV_Question_Answer_By_PkArgs = {
  heart_data_id: Scalars['uuid'];
  question_id: Scalars['Int'];
  survey_id: Scalars['Int'];
};


export type Subscription_RootV_Question_Answer_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<V_Question_Answer_Stream_Cursor_Input>>;
  where?: InputMaybe<V_Question_Answer_Bool_Exp>;
};


export type Subscription_RootV_Question_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootV_Question_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<V_Question_Stream_Cursor_Input>>;
  where?: InputMaybe<V_Question_Bool_Exp>;
};


export type Subscription_RootValues_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type Subscription_RootWhole_Body_CompArgs = {
  distinct_on?: InputMaybe<Array<Whole_Body_Comp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Whole_Body_Comp_Order_By>>;
  where?: InputMaybe<Whole_Body_Comp_Bool_Exp>;
};


export type Subscription_RootWhole_Body_Comp_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Whole_Body_Comp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Whole_Body_Comp_Order_By>>;
  where?: InputMaybe<Whole_Body_Comp_Bool_Exp>;
};


export type Subscription_RootWhole_Body_Comp_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootWhole_Body_Comp_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Whole_Body_Comp_Stream_Cursor_Input>>;
  where?: InputMaybe<Whole_Body_Comp_Bool_Exp>;
};

/** columns and relationships of "survey" */
export type Survey = {
  __typename?: 'survey';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** aggregated selection of "survey" */
export type Survey_Aggregate = {
  __typename?: 'survey_aggregate';
  aggregate?: Maybe<Survey_Aggregate_Fields>;
  nodes: Array<Survey>;
};

/** aggregate fields of "survey" */
export type Survey_Aggregate_Fields = {
  __typename?: 'survey_aggregate_fields';
  avg?: Maybe<Survey_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Survey_Max_Fields>;
  min?: Maybe<Survey_Min_Fields>;
  stddev?: Maybe<Survey_Stddev_Fields>;
  stddev_pop?: Maybe<Survey_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Survey_Stddev_Samp_Fields>;
  sum?: Maybe<Survey_Sum_Fields>;
  var_pop?: Maybe<Survey_Var_Pop_Fields>;
  var_samp?: Maybe<Survey_Var_Samp_Fields>;
  variance?: Maybe<Survey_Variance_Fields>;
};


/** aggregate fields of "survey" */
export type Survey_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Survey_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Survey_Avg_Fields = {
  __typename?: 'survey_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "survey". All fields are combined with a logical 'AND'. */
export type Survey_Bool_Exp = {
  _and?: InputMaybe<Array<Survey_Bool_Exp>>;
  _not?: InputMaybe<Survey_Bool_Exp>;
  _or?: InputMaybe<Array<Survey_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "survey" */
export enum Survey_Constraint {
  /** unique or primary key constraint on columns "id" */
  SurveyPkey = 'survey_pkey'
}

/** input type for incrementing numeric columns in table "survey" */
export type Survey_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "survey" */
export type Survey_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Survey_Max_Fields = {
  __typename?: 'survey_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Survey_Min_Fields = {
  __typename?: 'survey_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "survey" */
export type Survey_Mutation_Response = {
  __typename?: 'survey_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Survey>;
};

/** on_conflict condition type for table "survey" */
export type Survey_On_Conflict = {
  constraint: Survey_Constraint;
  update_columns?: Array<Survey_Update_Column>;
  where?: InputMaybe<Survey_Bool_Exp>;
};

/** Ordering options when selecting data from "survey". */
export type Survey_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: survey */
export type Survey_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "survey" */
export enum Survey_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "survey" */
export type Survey_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Survey_Stddev_Fields = {
  __typename?: 'survey_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Survey_Stddev_Pop_Fields = {
  __typename?: 'survey_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Survey_Stddev_Samp_Fields = {
  __typename?: 'survey_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "survey" */
export type Survey_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Survey_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Survey_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Survey_Sum_Fields = {
  __typename?: 'survey_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "survey" */
export enum Survey_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Survey_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Survey_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Survey_Set_Input>;
  /** filter the rows which have to be updated */
  where: Survey_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Survey_Var_Pop_Fields = {
  __typename?: 'survey_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Survey_Var_Samp_Fields = {
  __typename?: 'survey_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Survey_Variance_Fields = {
  __typename?: 'survey_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "tag" */
export type Tag = {
  __typename?: 'tag';
  /** An array relationship */
  heart_data_tags: Array<Heart_Data_Tag>;
  /** An aggregate relationship */
  heart_data_tags_aggregate: Heart_Data_Tag_Aggregate;
  id: Scalars['bigint'];
  name: Scalars['String'];
};


/** columns and relationships of "tag" */
export type TagHeart_Data_TagsArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Tag_Order_By>>;
  where?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
};


/** columns and relationships of "tag" */
export type TagHeart_Data_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Heart_Data_Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Heart_Data_Tag_Order_By>>;
  where?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
};

/** aggregated selection of "tag" */
export type Tag_Aggregate = {
  __typename?: 'tag_aggregate';
  aggregate?: Maybe<Tag_Aggregate_Fields>;
  nodes: Array<Tag>;
};

/** aggregate fields of "tag" */
export type Tag_Aggregate_Fields = {
  __typename?: 'tag_aggregate_fields';
  avg?: Maybe<Tag_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Tag_Max_Fields>;
  min?: Maybe<Tag_Min_Fields>;
  stddev?: Maybe<Tag_Stddev_Fields>;
  stddev_pop?: Maybe<Tag_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Tag_Stddev_Samp_Fields>;
  sum?: Maybe<Tag_Sum_Fields>;
  var_pop?: Maybe<Tag_Var_Pop_Fields>;
  var_samp?: Maybe<Tag_Var_Samp_Fields>;
  variance?: Maybe<Tag_Variance_Fields>;
};


/** aggregate fields of "tag" */
export type Tag_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tag_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Tag_Avg_Fields = {
  __typename?: 'tag_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "tag". All fields are combined with a logical 'AND'. */
export type Tag_Bool_Exp = {
  _and?: InputMaybe<Array<Tag_Bool_Exp>>;
  _not?: InputMaybe<Tag_Bool_Exp>;
  _or?: InputMaybe<Array<Tag_Bool_Exp>>;
  heart_data_tags?: InputMaybe<Heart_Data_Tag_Bool_Exp>;
  heart_data_tags_aggregate?: InputMaybe<Heart_Data_Tag_Aggregate_Bool_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "tag" */
export enum Tag_Constraint {
  /** unique or primary key constraint on columns "name" */
  TagNameKey = 'tag_name_key',
  /** unique or primary key constraint on columns "id" */
  TagPkey = 'tag_pkey'
}

/** input type for incrementing numeric columns in table "tag" */
export type Tag_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "tag" */
export type Tag_Insert_Input = {
  heart_data_tags?: InputMaybe<Heart_Data_Tag_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['bigint']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Tag_Max_Fields = {
  __typename?: 'tag_max_fields';
  id?: Maybe<Scalars['bigint']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Tag_Min_Fields = {
  __typename?: 'tag_min_fields';
  id?: Maybe<Scalars['bigint']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "tag" */
export type Tag_Mutation_Response = {
  __typename?: 'tag_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Tag>;
};

/** input type for inserting object relation for remote table "tag" */
export type Tag_Obj_Rel_Insert_Input = {
  data: Tag_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Tag_On_Conflict>;
};

/** on_conflict condition type for table "tag" */
export type Tag_On_Conflict = {
  constraint: Tag_Constraint;
  update_columns?: Array<Tag_Update_Column>;
  where?: InputMaybe<Tag_Bool_Exp>;
};

/** Ordering options when selecting data from "tag". */
export type Tag_Order_By = {
  heart_data_tags_aggregate?: InputMaybe<Heart_Data_Tag_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: tag */
export type Tag_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "tag" */
export enum Tag_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "tag" */
export type Tag_Set_Input = {
  id?: InputMaybe<Scalars['bigint']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Tag_Stddev_Fields = {
  __typename?: 'tag_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Tag_Stddev_Pop_Fields = {
  __typename?: 'tag_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Tag_Stddev_Samp_Fields = {
  __typename?: 'tag_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "tag" */
export type Tag_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tag_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tag_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['bigint']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Tag_Sum_Fields = {
  __typename?: 'tag_sum_fields';
  id?: Maybe<Scalars['bigint']>;
};

/** update columns of table "tag" */
export enum Tag_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Tag_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Tag_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Tag_Set_Input>;
  /** filter the rows which have to be updated */
  where: Tag_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Tag_Var_Pop_Fields = {
  __typename?: 'tag_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Tag_Var_Samp_Fields = {
  __typename?: 'tag_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Tag_Variance_Fields = {
  __typename?: 'tag_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type Tutorials = {
  __typename?: 'tutorials';
  body?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type TutorialsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type TutorialsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Tutorials_Aggregated = {
  __typename?: 'tutorials_aggregated';
  avg?: Maybe<Tutorials_Aggregated_Fields>;
  avgDistinct?: Maybe<Tutorials_Aggregated_Fields>;
  count?: Maybe<Tutorials_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Tutorials_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Tutorials_Aggregated_Fields>;
  min?: Maybe<Tutorials_Aggregated_Fields>;
  sum?: Maybe<Tutorials_Aggregated_Fields>;
  sumDistinct?: Maybe<Tutorials_Aggregated_Fields>;
};

export type Tutorials_Aggregated_Count = {
  __typename?: 'tutorials_aggregated_count';
  body?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Tutorials_Aggregated_Fields = {
  __typename?: 'tutorials_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Tutorials_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Tutorials_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Tutorials_Filter>>>;
  body?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Tutorials_Mutated = {
  __typename?: 'tutorials_mutated';
  data?: Maybe<Tutorials>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Update_Bg_Raw_Scores_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  explanation?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Disclaimer_Acknowledgement_Input = {
  Disclaimer?: InputMaybe<Update_Disclaimers_Input>;
  UserId?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Update_Disclaimers_Input = {
  Disclaimer?: InputMaybe<Scalars['String']>;
  Title?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Update_Feature_Requests_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Gradient_Colour_Input = {
  colour?: InputMaybe<Update_Repeat_Colour_Input>;
  id?: InputMaybe<Scalars['ID']>;
  position?: InputMaybe<Scalars['Int']>;
};

export type Update_Repeat_Colour_Input = {
  color?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Update_Solution_Category_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Solution_Input = {
  category?: InputMaybe<Update_Solution_Category_Input>;
  content?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Answer_Group_Input = {
  answer_sets?: InputMaybe<Array<InputMaybe<Update_Answer_Set_Input>>>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  owner_id?: InputMaybe<Scalars['String']>;
  questionnaire?: InputMaybe<Update_Questionnaire_Input>;
};

export type Update_Answer_Input = {
  answer_set?: InputMaybe<Update_Answer_Set_Input>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  option?: InputMaybe<Update_Option_Input>;
  question?: InputMaybe<Update_Question_Input>;
};

export type Update_Answer_Set_Input = {
  answer_group?: InputMaybe<Update_Answer_Group_Input>;
  answers?: InputMaybe<Array<InputMaybe<Update_Answer_Input>>>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  owner_id?: InputMaybe<Scalars['String']>;
  question_set?: InputMaybe<Update_Question_Set_Input>;
};

export type Update_Bar_Gradients_Gradient_Colour_Input = {
  Gradient_Colour_id?: InputMaybe<Update_Gradient_Colour_Input>;
  bar_gradients_id?: InputMaybe<Update_Bar_Gradients_Input>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Update_Bar_Gradients_Input = {
  bar_name?: InputMaybe<Scalars['String']>;
  colours?: InputMaybe<Array<InputMaybe<Update_Bar_Gradients_Gradient_Colour_Input>>>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Update_Bg_Parameters_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  explanation?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Descriptions_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  hq_mobile?: InputMaybe<Scalars['String']>;
  hq_professional?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Directus_Access_Input = {
  id?: InputMaybe<Scalars['ID']>;
  policy?: InputMaybe<Update_Directus_Policies_Input>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  sort?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Directus_Files_Input = {
  charset?: InputMaybe<Scalars['String']>;
  created_on?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  embed?: InputMaybe<Scalars['String']>;
  filename_disk?: InputMaybe<Scalars['String']>;
  filename_download?: InputMaybe<Scalars['String']>;
  filesize?: InputMaybe<Scalars['GraphQLBigInt']>;
  focal_point_x?: InputMaybe<Scalars['Int']>;
  focal_point_y?: InputMaybe<Scalars['Int']>;
  folder?: InputMaybe<Update_Directus_Folders_Input>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  modified_by?: InputMaybe<Update_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars['Date']>;
  storage?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  title?: InputMaybe<Scalars['String']>;
  tus_data?: InputMaybe<Scalars['JSON']>;
  tus_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  uploaded_by?: InputMaybe<Update_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars['Date']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type Update_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Update_Directus_Folders_Input>;
};

export type Update_Directus_Permissions_Input = {
  action?: InputMaybe<Scalars['String']>;
  collection?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['ID']>;
  permissions?: InputMaybe<Scalars['JSON']>;
  policy?: InputMaybe<Update_Directus_Policies_Input>;
  presets?: InputMaybe<Scalars['JSON']>;
  validation?: InputMaybe<Scalars['JSON']>;
};

export type Update_Directus_Policies_Input = {
  admin_access?: InputMaybe<Scalars['Boolean']>;
  app_access?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  /** $t:field_options.directus_policies.enforce_tfa */
  enforce_tfa?: InputMaybe<Scalars['Boolean']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Update_Directus_Permissions_Input>>>;
  roles?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
};

export type Update_Directus_Roles_Input = {
  children?: InputMaybe<Array<InputMaybe<Update_Directus_Roles_Input>>>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Update_Directus_Roles_Input>;
  policies?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Update_Directus_Users_Input>>>;
};

export type Update_Directus_Users_Input = {
  appearance?: InputMaybe<Scalars['String']>;
  auth_data?: InputMaybe<Scalars['JSON']>;
  avatar?: InputMaybe<Update_Directus_Files_Input>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email_notifications?: InputMaybe<Scalars['Boolean']>;
  external_identifier?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  language?: InputMaybe<Scalars['String']>;
  last_access?: InputMaybe<Scalars['Date']>;
  last_name?: InputMaybe<Scalars['String']>;
  last_page?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['Hash']>;
  policies?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
  provider?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  status?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  tfa_secret?: InputMaybe<Scalars['Hash']>;
  theme_dark?: InputMaybe<Scalars['String']>;
  theme_dark_overrides?: InputMaybe<Scalars['JSON']>;
  theme_light?: InputMaybe<Scalars['String']>;
  theme_light_overrides?: InputMaybe<Scalars['JSON']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['Hash']>;
};

export type Update_Explanation_Input = {
  Ref_Key?: InputMaybe<Update_Values_Input>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  explanation?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  show_title?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Global_Notifications_Input = {
  Title?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  message?: InputMaybe<Scalars['String']>;
  message_type?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Match_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  explanation?: InputMaybe<Update_Explanation_Input>;
  gender?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  max?: InputMaybe<Scalars['Float']>;
  max_age?: InputMaybe<Scalars['Float']>;
  min?: InputMaybe<Scalars['Float']>;
  min_age?: InputMaybe<Scalars['Float']>;
  refKey?: InputMaybe<Update_Values_Input>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Option_Group_Input = {
  details?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  options?: InputMaybe<Array<InputMaybe<Update_Option_Input>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type Update_Option_Input = {
  id?: InputMaybe<Scalars['ID']>;
  option_group?: InputMaybe<Update_Option_Group_Input>;
  sort?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Int']>;
};

export type Update_Question_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  instructions?: InputMaybe<Scalars['String']>;
  option_group?: InputMaybe<Update_Option_Group_Input>;
  question?: InputMaybe<Scalars['String']>;
  question_set?: InputMaybe<Update_Question_Set_Input>;
  sort?: InputMaybe<Scalars['Int']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Question_Set_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  instructions?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  questionnaires?: InputMaybe<Array<InputMaybe<Update_Questionnaire_Question_Set_Input>>>;
  questions?: InputMaybe<Array<InputMaybe<Update_Question_Input>>>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Update_Questionnaire_Conclusion_Input = {
  content?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  questionnaire?: InputMaybe<Update_Questionnaire_Input>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Questionnaire_Input = {
  answer_group?: InputMaybe<Array<InputMaybe<Update_Answer_Group_Input>>>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  instructions?: InputMaybe<Scalars['String']>;
  question_sets?: InputMaybe<Array<InputMaybe<Update_Questionnaire_Question_Set_Input>>>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Questionnaire_Question_Set_Input = {
  id?: InputMaybe<Scalars['ID']>;
  optional?: InputMaybe<Scalars['Boolean']>;
  question_set_id?: InputMaybe<Update_Question_Set_Input>;
  questionnaire_id?: InputMaybe<Update_Questionnaire_Input>;
};

export type Update_Tutorials_Input = {
  body?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Values_Input = {
  abs_max?: InputMaybe<Scalars['Float']>;
  abs_min?: InputMaybe<Scalars['Float']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  grouping?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  ideal_max?: InputMaybe<Scalars['Float']>;
  ideal_min?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_alt?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

/** This contains metadata about the user */
export type User_Metadata = {
  __typename?: 'user_metadata';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  metadata: Scalars['jsonb'];
  updated_at: Scalars['timestamptz'];
};


/** This contains metadata about the user */
export type User_MetadataMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "user_metadata" */
export type User_Metadata_Aggregate = {
  __typename?: 'user_metadata_aggregate';
  aggregate?: Maybe<User_Metadata_Aggregate_Fields>;
  nodes: Array<User_Metadata>;
};

/** aggregate fields of "user_metadata" */
export type User_Metadata_Aggregate_Fields = {
  __typename?: 'user_metadata_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<User_Metadata_Max_Fields>;
  min?: Maybe<User_Metadata_Min_Fields>;
};


/** aggregate fields of "user_metadata" */
export type User_Metadata_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type User_Metadata_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "user_metadata". All fields are combined with a logical 'AND'. */
export type User_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<User_Metadata_Bool_Exp>>;
  _not?: InputMaybe<User_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<User_Metadata_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_metadata" */
export enum User_Metadata_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserMetadataPkey = 'user_metadata_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type User_Metadata_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type User_Metadata_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type User_Metadata_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "user_metadata" */
export type User_Metadata_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type User_Metadata_Max_Fields = {
  __typename?: 'user_metadata_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type User_Metadata_Min_Fields = {
  __typename?: 'user_metadata_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "user_metadata" */
export type User_Metadata_Mutation_Response = {
  __typename?: 'user_metadata_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Metadata>;
};

/** on_conflict condition type for table "user_metadata" */
export type User_Metadata_On_Conflict = {
  constraint: User_Metadata_Constraint;
  update_columns?: Array<User_Metadata_Update_Column>;
  where?: InputMaybe<User_Metadata_Bool_Exp>;
};

/** Ordering options when selecting data from "user_metadata". */
export type User_Metadata_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_metadata */
export type User_Metadata_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type User_Metadata_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "user_metadata" */
export enum User_Metadata_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "user_metadata" */
export type User_Metadata_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "user_metadata" */
export type User_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Metadata_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "user_metadata" */
export enum User_Metadata_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type User_Metadata_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<User_Metadata_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<User_Metadata_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<User_Metadata_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<User_Metadata_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<User_Metadata_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Metadata_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Metadata_Bool_Exp;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  active: Scalars['Boolean'];
  birth_date?: Maybe<Scalars['bpchar']>;
  clean_speak_id?: Maybe<Scalars['uuid']>;
  data?: Maybe<Scalars['String']>;
  expiry?: Maybe<Scalars['bigint']>;
  first_name?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  /** An array relationship */
  identities: Array<Identities>;
  /** An aggregate relationship */
  identities_aggregate: Identities_Aggregate;
  image_url?: Maybe<Scalars['String']>;
  insert_instant: Scalars['bigint'];
  last_name?: Maybe<Scalars['String']>;
  last_update_instant: Scalars['bigint'];
  middle_name?: Maybe<Scalars['String']>;
  mobile_phone?: Maybe<Scalars['String']>;
  parent_email?: Maybe<Scalars['String']>;
  tenants_id: Scalars['uuid'];
  timezone?: Maybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersIdentitiesArgs = {
  distinct_on?: InputMaybe<Array<Identities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identities_Order_By>>;
  where?: InputMaybe<Identities_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersIdentities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Identities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identities_Order_By>>;
  where?: InputMaybe<Identities_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  avg?: Maybe<Users_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
  stddev?: Maybe<Users_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Sum_Fields>;
  var_pop?: Maybe<Users_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Var_Samp_Fields>;
  variance?: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields';
  expiry?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  active?: InputMaybe<Boolean_Comparison_Exp>;
  birth_date?: InputMaybe<Bpchar_Comparison_Exp>;
  clean_speak_id?: InputMaybe<Uuid_Comparison_Exp>;
  data?: InputMaybe<String_Comparison_Exp>;
  expiry?: InputMaybe<Bigint_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  full_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  identities?: InputMaybe<Identities_Bool_Exp>;
  identities_aggregate?: InputMaybe<Identities_Aggregate_Bool_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  insert_instant?: InputMaybe<Bigint_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  last_update_instant?: InputMaybe<Bigint_Comparison_Exp>;
  middle_name?: InputMaybe<String_Comparison_Exp>;
  mobile_phone?: InputMaybe<String_Comparison_Exp>;
  parent_email?: InputMaybe<String_Comparison_Exp>;
  tenants_id?: InputMaybe<Uuid_Comparison_Exp>;
  timezone?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
  expiry?: InputMaybe<Scalars['bigint']>;
  insert_instant?: InputMaybe<Scalars['bigint']>;
  last_update_instant?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  active?: InputMaybe<Scalars['Boolean']>;
  birth_date?: InputMaybe<Scalars['bpchar']>;
  clean_speak_id?: InputMaybe<Scalars['uuid']>;
  data?: InputMaybe<Scalars['String']>;
  expiry?: InputMaybe<Scalars['bigint']>;
  first_name?: InputMaybe<Scalars['String']>;
  full_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  identities?: InputMaybe<Identities_Arr_Rel_Insert_Input>;
  image_url?: InputMaybe<Scalars['String']>;
  insert_instant?: InputMaybe<Scalars['bigint']>;
  last_name?: InputMaybe<Scalars['String']>;
  last_update_instant?: InputMaybe<Scalars['bigint']>;
  middle_name?: InputMaybe<Scalars['String']>;
  mobile_phone?: InputMaybe<Scalars['String']>;
  parent_email?: InputMaybe<Scalars['String']>;
  tenants_id?: InputMaybe<Scalars['uuid']>;
  timezone?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  birth_date?: Maybe<Scalars['bpchar']>;
  clean_speak_id?: Maybe<Scalars['uuid']>;
  data?: Maybe<Scalars['String']>;
  expiry?: Maybe<Scalars['bigint']>;
  first_name?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  insert_instant?: Maybe<Scalars['bigint']>;
  last_name?: Maybe<Scalars['String']>;
  last_update_instant?: Maybe<Scalars['bigint']>;
  middle_name?: Maybe<Scalars['String']>;
  mobile_phone?: Maybe<Scalars['String']>;
  parent_email?: Maybe<Scalars['String']>;
  tenants_id?: Maybe<Scalars['uuid']>;
  timezone?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  birth_date?: Maybe<Scalars['bpchar']>;
  clean_speak_id?: Maybe<Scalars['uuid']>;
  data?: Maybe<Scalars['String']>;
  expiry?: Maybe<Scalars['bigint']>;
  first_name?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  insert_instant?: Maybe<Scalars['bigint']>;
  last_name?: Maybe<Scalars['String']>;
  last_update_instant?: Maybe<Scalars['bigint']>;
  middle_name?: Maybe<Scalars['String']>;
  mobile_phone?: Maybe<Scalars['String']>;
  parent_email?: Maybe<Scalars['String']>;
  tenants_id?: Maybe<Scalars['uuid']>;
  timezone?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  active?: InputMaybe<Order_By>;
  birth_date?: InputMaybe<Order_By>;
  clean_speak_id?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  expiry?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  full_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identities_aggregate?: InputMaybe<Identities_Aggregate_Order_By>;
  image_url?: InputMaybe<Order_By>;
  insert_instant?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  last_update_instant?: InputMaybe<Order_By>;
  middle_name?: InputMaybe<Order_By>;
  mobile_phone?: InputMaybe<Order_By>;
  parent_email?: InputMaybe<Order_By>;
  tenants_id?: InputMaybe<Order_By>;
  timezone?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  BirthDate = 'birth_date',
  /** column name */
  CleanSpeakId = 'clean_speak_id',
  /** column name */
  Data = 'data',
  /** column name */
  Expiry = 'expiry',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FullName = 'full_name',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  InsertInstant = 'insert_instant',
  /** column name */
  LastName = 'last_name',
  /** column name */
  LastUpdateInstant = 'last_update_instant',
  /** column name */
  MiddleName = 'middle_name',
  /** column name */
  MobilePhone = 'mobile_phone',
  /** column name */
  ParentEmail = 'parent_email',
  /** column name */
  TenantsId = 'tenants_id',
  /** column name */
  Timezone = 'timezone'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  active?: InputMaybe<Scalars['Boolean']>;
  birth_date?: InputMaybe<Scalars['bpchar']>;
  clean_speak_id?: InputMaybe<Scalars['uuid']>;
  data?: InputMaybe<Scalars['String']>;
  expiry?: InputMaybe<Scalars['bigint']>;
  first_name?: InputMaybe<Scalars['String']>;
  full_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  insert_instant?: InputMaybe<Scalars['bigint']>;
  last_name?: InputMaybe<Scalars['String']>;
  last_update_instant?: InputMaybe<Scalars['bigint']>;
  middle_name?: InputMaybe<Scalars['String']>;
  mobile_phone?: InputMaybe<Scalars['String']>;
  parent_email?: InputMaybe<Scalars['String']>;
  tenants_id?: InputMaybe<Scalars['uuid']>;
  timezone?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields';
  expiry?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields';
  expiry?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields';
  expiry?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  active?: InputMaybe<Scalars['Boolean']>;
  birth_date?: InputMaybe<Scalars['bpchar']>;
  clean_speak_id?: InputMaybe<Scalars['uuid']>;
  data?: InputMaybe<Scalars['String']>;
  expiry?: InputMaybe<Scalars['bigint']>;
  first_name?: InputMaybe<Scalars['String']>;
  full_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  insert_instant?: InputMaybe<Scalars['bigint']>;
  last_name?: InputMaybe<Scalars['String']>;
  last_update_instant?: InputMaybe<Scalars['bigint']>;
  middle_name?: InputMaybe<Scalars['String']>;
  mobile_phone?: InputMaybe<Scalars['String']>;
  parent_email?: InputMaybe<Scalars['String']>;
  tenants_id?: InputMaybe<Scalars['uuid']>;
  timezone?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields';
  expiry?: Maybe<Scalars['bigint']>;
  insert_instant?: Maybe<Scalars['bigint']>;
  last_update_instant?: Maybe<Scalars['bigint']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  BirthDate = 'birth_date',
  /** column name */
  CleanSpeakId = 'clean_speak_id',
  /** column name */
  Data = 'data',
  /** column name */
  Expiry = 'expiry',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FullName = 'full_name',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  InsertInstant = 'insert_instant',
  /** column name */
  LastName = 'last_name',
  /** column name */
  LastUpdateInstant = 'last_update_instant',
  /** column name */
  MiddleName = 'middle_name',
  /** column name */
  MobilePhone = 'mobile_phone',
  /** column name */
  ParentEmail = 'parent_email',
  /** column name */
  TenantsId = 'tenants_id',
  /** column name */
  Timezone = 'timezone'
}

export type Users_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Users_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields';
  expiry?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields';
  expiry?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields';
  expiry?: Maybe<Scalars['Float']>;
  insert_instant?: Maybe<Scalars['Float']>;
  last_update_instant?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "v_answer" */
export type V_Answer = {
  __typename?: 'v_answer';
  answer: Scalars['Boolean'];
  created_at: Scalars['timestamptz'];
  heart_data_id: Scalars['uuid'];
  id: Scalars['bigint'];
  question_id: Scalars['Int'];
};

/** aggregated selection of "v_answer" */
export type V_Answer_Aggregate = {
  __typename?: 'v_answer_aggregate';
  aggregate?: Maybe<V_Answer_Aggregate_Fields>;
  nodes: Array<V_Answer>;
};

/** aggregate fields of "v_answer" */
export type V_Answer_Aggregate_Fields = {
  __typename?: 'v_answer_aggregate_fields';
  avg?: Maybe<V_Answer_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<V_Answer_Max_Fields>;
  min?: Maybe<V_Answer_Min_Fields>;
  stddev?: Maybe<V_Answer_Stddev_Fields>;
  stddev_pop?: Maybe<V_Answer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<V_Answer_Stddev_Samp_Fields>;
  sum?: Maybe<V_Answer_Sum_Fields>;
  var_pop?: Maybe<V_Answer_Var_Pop_Fields>;
  var_samp?: Maybe<V_Answer_Var_Samp_Fields>;
  variance?: Maybe<V_Answer_Variance_Fields>;
};


/** aggregate fields of "v_answer" */
export type V_Answer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<V_Answer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type V_Answer_Avg_Fields = {
  __typename?: 'v_answer_avg_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "v_answer". All fields are combined with a logical 'AND'. */
export type V_Answer_Bool_Exp = {
  _and?: InputMaybe<Array<V_Answer_Bool_Exp>>;
  _not?: InputMaybe<V_Answer_Bool_Exp>;
  _or?: InputMaybe<Array<V_Answer_Bool_Exp>>;
  answer?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  heart_data_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  question_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "v_answer" */
export enum V_Answer_Constraint {
  /** unique or primary key constraint on columns "id" */
  AnswerPkey = 'answer_pkey',
  /** unique or primary key constraint on columns "question_id", "heart_data_id" */
  AnswerQuestionIdHeartDataIdKey = 'answer_question_id_heart_data_id_key'
}

/** input type for incrementing numeric columns in table "v_answer" */
export type V_Answer_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
  question_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "v_answer" */
export type V_Answer_Insert_Input = {
  answer?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  question_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type V_Answer_Max_Fields = {
  __typename?: 'v_answer_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['bigint']>;
  question_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type V_Answer_Min_Fields = {
  __typename?: 'v_answer_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['bigint']>;
  question_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "v_answer" */
export type V_Answer_Mutation_Response = {
  __typename?: 'v_answer_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<V_Answer>;
};

/** on_conflict condition type for table "v_answer" */
export type V_Answer_On_Conflict = {
  constraint: V_Answer_Constraint;
  update_columns?: Array<V_Answer_Update_Column>;
  where?: InputMaybe<V_Answer_Bool_Exp>;
};

/** Ordering options when selecting data from "v_answer". */
export type V_Answer_Order_By = {
  answer?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  heart_data_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: v_answer */
export type V_Answer_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "v_answer" */
export enum V_Answer_Select_Column {
  /** column name */
  Answer = 'answer',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  QuestionId = 'question_id'
}

/** input type for updating data in table "v_answer" */
export type V_Answer_Set_Input = {
  answer?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  question_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type V_Answer_Stddev_Fields = {
  __typename?: 'v_answer_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type V_Answer_Stddev_Pop_Fields = {
  __typename?: 'v_answer_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type V_Answer_Stddev_Samp_Fields = {
  __typename?: 'v_answer_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "v_answer" */
export type V_Answer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: V_Answer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type V_Answer_Stream_Cursor_Value_Input = {
  answer?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['bigint']>;
  question_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type V_Answer_Sum_Fields = {
  __typename?: 'v_answer_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  question_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "v_answer" */
export enum V_Answer_Update_Column {
  /** column name */
  Answer = 'answer',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Id = 'id',
  /** column name */
  QuestionId = 'question_id'
}

export type V_Answer_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<V_Answer_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<V_Answer_Set_Input>;
  /** filter the rows which have to be updated */
  where: V_Answer_Bool_Exp;
};

/** aggregate var_pop on columns */
export type V_Answer_Var_Pop_Fields = {
  __typename?: 'v_answer_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type V_Answer_Var_Samp_Fields = {
  __typename?: 'v_answer_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type V_Answer_Variance_Fields = {
  __typename?: 'v_answer_variance_fields';
  id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "v_question" */
export type V_Question = {
  __typename?: 'v_question';
  id: Scalars['Int'];
  question: Scalars['String'];
  survey_id: Scalars['Int'];
};

/** aggregated selection of "v_question" */
export type V_Question_Aggregate = {
  __typename?: 'v_question_aggregate';
  aggregate?: Maybe<V_Question_Aggregate_Fields>;
  nodes: Array<V_Question>;
};

/** aggregate fields of "v_question" */
export type V_Question_Aggregate_Fields = {
  __typename?: 'v_question_aggregate_fields';
  avg?: Maybe<V_Question_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<V_Question_Max_Fields>;
  min?: Maybe<V_Question_Min_Fields>;
  stddev?: Maybe<V_Question_Stddev_Fields>;
  stddev_pop?: Maybe<V_Question_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<V_Question_Stddev_Samp_Fields>;
  sum?: Maybe<V_Question_Sum_Fields>;
  var_pop?: Maybe<V_Question_Var_Pop_Fields>;
  var_samp?: Maybe<V_Question_Var_Samp_Fields>;
  variance?: Maybe<V_Question_Variance_Fields>;
};


/** aggregate fields of "v_question" */
export type V_Question_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<V_Question_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** columns and relationships of "v_question_answer" */
export type V_Question_Answer = {
  __typename?: 'v_question_answer';
  answer: Scalars['Boolean'];
  answer_id: Scalars['bigint'];
  heart_data_id: Scalars['uuid'];
  question: Scalars['String'];
  question_id: Scalars['Int'];
  survey_id: Scalars['Int'];
};

export type V_Question_Answer_Aggregate = {
  __typename?: 'v_question_answer_aggregate';
  aggregate?: Maybe<V_Question_Answer_Aggregate_Fields>;
  nodes: Array<V_Question_Answer>;
};

/** aggregate fields of "v_question_answer" */
export type V_Question_Answer_Aggregate_Fields = {
  __typename?: 'v_question_answer_aggregate_fields';
  avg?: Maybe<V_Question_Answer_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<V_Question_Answer_Max_Fields>;
  min?: Maybe<V_Question_Answer_Min_Fields>;
  stddev?: Maybe<V_Question_Answer_Stddev_Fields>;
  stddev_pop?: Maybe<V_Question_Answer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<V_Question_Answer_Stddev_Samp_Fields>;
  sum?: Maybe<V_Question_Answer_Sum_Fields>;
  var_pop?: Maybe<V_Question_Answer_Var_Pop_Fields>;
  var_samp?: Maybe<V_Question_Answer_Var_Samp_Fields>;
  variance?: Maybe<V_Question_Answer_Variance_Fields>;
};


/** aggregate fields of "v_question_answer" */
export type V_Question_Answer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<V_Question_Answer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type V_Question_Answer_Avg_Fields = {
  __typename?: 'v_question_answer_avg_fields';
  answer_id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "v_question_answer". All fields are combined with a logical 'AND'. */
export type V_Question_Answer_Bool_Exp = {
  _and?: InputMaybe<Array<V_Question_Answer_Bool_Exp>>;
  _not?: InputMaybe<V_Question_Answer_Bool_Exp>;
  _or?: InputMaybe<Array<V_Question_Answer_Bool_Exp>>;
  answer?: InputMaybe<Boolean_Comparison_Exp>;
  answer_id?: InputMaybe<Bigint_Comparison_Exp>;
  heart_data_id?: InputMaybe<Uuid_Comparison_Exp>;
  question?: InputMaybe<String_Comparison_Exp>;
  question_id?: InputMaybe<Int_Comparison_Exp>;
  survey_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "v_question_answer" */
export enum V_Question_Answer_Constraint {
  /** unique or primary key constraint on columns "question_id", "survey_id", "heart_data_id" */
  VQuestionAnswerPkey = 'v_question_answer_pkey'
}

/** input type for incrementing numeric columns in table "v_question_answer" */
export type V_Question_Answer_Inc_Input = {
  answer_id?: InputMaybe<Scalars['bigint']>;
  question_id?: InputMaybe<Scalars['Int']>;
  survey_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "v_question_answer" */
export type V_Question_Answer_Insert_Input = {
  answer?: InputMaybe<Scalars['Boolean']>;
  answer_id?: InputMaybe<Scalars['bigint']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  question?: InputMaybe<Scalars['String']>;
  question_id?: InputMaybe<Scalars['Int']>;
  survey_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type V_Question_Answer_Max_Fields = {
  __typename?: 'v_question_answer_max_fields';
  answer_id?: Maybe<Scalars['bigint']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  question?: Maybe<Scalars['String']>;
  question_id?: Maybe<Scalars['Int']>;
  survey_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type V_Question_Answer_Min_Fields = {
  __typename?: 'v_question_answer_min_fields';
  answer_id?: Maybe<Scalars['bigint']>;
  heart_data_id?: Maybe<Scalars['uuid']>;
  question?: Maybe<Scalars['String']>;
  question_id?: Maybe<Scalars['Int']>;
  survey_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "v_question_answer" */
export type V_Question_Answer_Mutation_Response = {
  __typename?: 'v_question_answer_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<V_Question_Answer>;
};

/** on_conflict condition type for table "v_question_answer" */
export type V_Question_Answer_On_Conflict = {
  constraint: V_Question_Answer_Constraint;
  update_columns?: Array<V_Question_Answer_Update_Column>;
  where?: InputMaybe<V_Question_Answer_Bool_Exp>;
};

/** Ordering options when selecting data from "v_question_answer". */
export type V_Question_Answer_Order_By = {
  answer?: InputMaybe<Order_By>;
  answer_id?: InputMaybe<Order_By>;
  heart_data_id?: InputMaybe<Order_By>;
  question?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
  survey_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: v_question_answer */
export type V_Question_Answer_Pk_Columns_Input = {
  heart_data_id: Scalars['uuid'];
  question_id: Scalars['Int'];
  survey_id: Scalars['Int'];
};

/** select columns of table "v_question_answer" */
export enum V_Question_Answer_Select_Column {
  /** column name */
  Answer = 'answer',
  /** column name */
  AnswerId = 'answer_id',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Question = 'question',
  /** column name */
  QuestionId = 'question_id',
  /** column name */
  SurveyId = 'survey_id'
}

/** input type for updating data in table "v_question_answer" */
export type V_Question_Answer_Set_Input = {
  answer?: InputMaybe<Scalars['Boolean']>;
  answer_id?: InputMaybe<Scalars['bigint']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  question?: InputMaybe<Scalars['String']>;
  question_id?: InputMaybe<Scalars['Int']>;
  survey_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type V_Question_Answer_Stddev_Fields = {
  __typename?: 'v_question_answer_stddev_fields';
  answer_id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type V_Question_Answer_Stddev_Pop_Fields = {
  __typename?: 'v_question_answer_stddev_pop_fields';
  answer_id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type V_Question_Answer_Stddev_Samp_Fields = {
  __typename?: 'v_question_answer_stddev_samp_fields';
  answer_id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "v_question_answer" */
export type V_Question_Answer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: V_Question_Answer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type V_Question_Answer_Stream_Cursor_Value_Input = {
  answer?: InputMaybe<Scalars['Boolean']>;
  answer_id?: InputMaybe<Scalars['bigint']>;
  heart_data_id?: InputMaybe<Scalars['uuid']>;
  question?: InputMaybe<Scalars['String']>;
  question_id?: InputMaybe<Scalars['Int']>;
  survey_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type V_Question_Answer_Sum_Fields = {
  __typename?: 'v_question_answer_sum_fields';
  answer_id?: Maybe<Scalars['bigint']>;
  question_id?: Maybe<Scalars['Int']>;
  survey_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "v_question_answer" */
export enum V_Question_Answer_Update_Column {
  /** column name */
  Answer = 'answer',
  /** column name */
  AnswerId = 'answer_id',
  /** column name */
  HeartDataId = 'heart_data_id',
  /** column name */
  Question = 'question',
  /** column name */
  QuestionId = 'question_id',
  /** column name */
  SurveyId = 'survey_id'
}

export type V_Question_Answer_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<V_Question_Answer_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<V_Question_Answer_Set_Input>;
  /** filter the rows which have to be updated */
  where: V_Question_Answer_Bool_Exp;
};

/** aggregate var_pop on columns */
export type V_Question_Answer_Var_Pop_Fields = {
  __typename?: 'v_question_answer_var_pop_fields';
  answer_id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type V_Question_Answer_Var_Samp_Fields = {
  __typename?: 'v_question_answer_var_samp_fields';
  answer_id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type V_Question_Answer_Variance_Fields = {
  __typename?: 'v_question_answer_variance_fields';
  answer_id?: Maybe<Scalars['Float']>;
  question_id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** aggregate avg on columns */
export type V_Question_Avg_Fields = {
  __typename?: 'v_question_avg_fields';
  id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "v_question". All fields are combined with a logical 'AND'. */
export type V_Question_Bool_Exp = {
  _and?: InputMaybe<Array<V_Question_Bool_Exp>>;
  _not?: InputMaybe<V_Question_Bool_Exp>;
  _or?: InputMaybe<Array<V_Question_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  question?: InputMaybe<String_Comparison_Exp>;
  survey_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "v_question" */
export enum V_Question_Constraint {
  /** unique or primary key constraint on columns "id" */
  QuestionPkey = 'question_pkey'
}

/** input type for incrementing numeric columns in table "v_question" */
export type V_Question_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  survey_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "v_question" */
export type V_Question_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  question?: InputMaybe<Scalars['String']>;
  survey_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type V_Question_Max_Fields = {
  __typename?: 'v_question_max_fields';
  id?: Maybe<Scalars['Int']>;
  question?: Maybe<Scalars['String']>;
  survey_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type V_Question_Min_Fields = {
  __typename?: 'v_question_min_fields';
  id?: Maybe<Scalars['Int']>;
  question?: Maybe<Scalars['String']>;
  survey_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "v_question" */
export type V_Question_Mutation_Response = {
  __typename?: 'v_question_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<V_Question>;
};

/** on_conflict condition type for table "v_question" */
export type V_Question_On_Conflict = {
  constraint: V_Question_Constraint;
  update_columns?: Array<V_Question_Update_Column>;
  where?: InputMaybe<V_Question_Bool_Exp>;
};

/** Ordering options when selecting data from "v_question". */
export type V_Question_Order_By = {
  id?: InputMaybe<Order_By>;
  question?: InputMaybe<Order_By>;
  survey_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: v_question */
export type V_Question_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "v_question" */
export enum V_Question_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Question = 'question',
  /** column name */
  SurveyId = 'survey_id'
}

/** input type for updating data in table "v_question" */
export type V_Question_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  question?: InputMaybe<Scalars['String']>;
  survey_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type V_Question_Stddev_Fields = {
  __typename?: 'v_question_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type V_Question_Stddev_Pop_Fields = {
  __typename?: 'v_question_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type V_Question_Stddev_Samp_Fields = {
  __typename?: 'v_question_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "v_question" */
export type V_Question_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: V_Question_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type V_Question_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']>;
  question?: InputMaybe<Scalars['String']>;
  survey_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type V_Question_Sum_Fields = {
  __typename?: 'v_question_sum_fields';
  id?: Maybe<Scalars['Int']>;
  survey_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "v_question" */
export enum V_Question_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Question = 'question',
  /** column name */
  SurveyId = 'survey_id'
}

export type V_Question_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<V_Question_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<V_Question_Set_Input>;
  /** filter the rows which have to be updated */
  where: V_Question_Bool_Exp;
};

/** aggregate var_pop on columns */
export type V_Question_Var_Pop_Fields = {
  __typename?: 'v_question_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type V_Question_Var_Samp_Fields = {
  __typename?: 'v_question_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type V_Question_Variance_Fields = {
  __typename?: 'v_question_variance_fields';
  id?: Maybe<Scalars['Float']>;
  survey_id?: Maybe<Scalars['Float']>;
};

export type Values = {
  __typename?: 'values';
  abs_max?: Maybe<Scalars['Float']>;
  abs_min?: Maybe<Scalars['Float']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  grouping?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ideal_max?: Maybe<Scalars['Float']>;
  ideal_min?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  title_alt?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type ValuesUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ValuesUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Values_Aggregated = {
  __typename?: 'values_aggregated';
  avg?: Maybe<Values_Aggregated_Fields>;
  avgDistinct?: Maybe<Values_Aggregated_Fields>;
  count?: Maybe<Values_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Values_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Values_Aggregated_Fields>;
  min?: Maybe<Values_Aggregated_Fields>;
  sum?: Maybe<Values_Aggregated_Fields>;
  sumDistinct?: Maybe<Values_Aggregated_Fields>;
};

export type Values_Aggregated_Count = {
  __typename?: 'values_aggregated_count';
  abs_max?: Maybe<Scalars['Int']>;
  abs_min?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  grouping?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  ideal_max?: Maybe<Scalars['Int']>;
  ideal_min?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  title_alt?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Values_Aggregated_Fields = {
  __typename?: 'values_aggregated_fields';
  abs_max?: Maybe<Scalars['Float']>;
  abs_min?: Maybe<Scalars['Float']>;
  ideal_max?: Maybe<Scalars['Float']>;
  ideal_min?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Values_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Values_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Values_Filter>>>;
  abs_max?: InputMaybe<Number_Filter_Operators>;
  abs_min?: InputMaybe<Number_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  grouping?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  ideal_max?: InputMaybe<Number_Filter_Operators>;
  ideal_min?: InputMaybe<Number_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  title_alt?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Values_Mutated = {
  __typename?: 'values_mutated';
  data?: Maybe<Values>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID'];
};

export type Version_Bg_Raw_Scores = {
  __typename?: 'version_BG_Raw_Scores';
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  explanation?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Disclaimer_Acknowledgement = {
  __typename?: 'version_Disclaimer_Acknowledgement';
  Disclaimer?: Maybe<Scalars['JSON']>;
  UserId?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
};

export type Version_Disclaimers = {
  __typename?: 'version_Disclaimers';
  Disclaimer?: Maybe<Scalars['String']>;
  Title?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
};

export type Version_Feature_Requests = {
  __typename?: 'version_Feature_Requests';
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_created?: Maybe<Scalars['JSON']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Gradient_Colour = {
  __typename?: 'version_Gradient_Colour';
  colour?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['ID']>;
  position?: Maybe<Scalars['Int']>;
};

export type Version_Repeat_Colour = {
  __typename?: 'version_Repeat_Colour';
  color?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Version_Solution = {
  __typename?: 'version_Solution';
  category?: Maybe<Scalars['JSON']>;
  content?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['JSON']>;
  title?: Maybe<Scalars['String']>;
  user_created?: Maybe<Scalars['JSON']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Solution_Category = {
  __typename?: 'version_Solution_Category';
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  user_created?: Maybe<Scalars['JSON']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Answer = {
  __typename?: 'version_answer';
  answer_set?: Maybe<Scalars['JSON']>;
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  option?: Maybe<Scalars['JSON']>;
  question?: Maybe<Scalars['JSON']>;
};

export type Version_Answer_Group = {
  __typename?: 'version_answer_group';
  answer_sets?: Maybe<Scalars['JSON']>;
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  owner_id?: Maybe<Scalars['String']>;
  questionnaire?: Maybe<Scalars['JSON']>;
};

export type Version_Answer_Set = {
  __typename?: 'version_answer_set';
  answer_group?: Maybe<Scalars['JSON']>;
  answers?: Maybe<Scalars['JSON']>;
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  owner_id?: Maybe<Scalars['String']>;
  question_set?: Maybe<Scalars['JSON']>;
};

export type Version_Bar_Gradients = {
  __typename?: 'version_bar_gradients';
  bar_name?: Maybe<Scalars['String']>;
  colours?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['ID']>;
};

export type Version_Bar_Gradients_Gradient_Colour = {
  __typename?: 'version_bar_gradients_Gradient_Colour';
  Gradient_Colour_id?: Maybe<Scalars['JSON']>;
  bar_gradients_id?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['ID']>;
};

export type Version_Bg_Parameters = {
  __typename?: 'version_bg_parameters';
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  explanation?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Descriptions = {
  __typename?: 'version_descriptions';
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  hq_mobile?: Maybe<Scalars['String']>;
  hq_professional?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  key?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  user_created?: Maybe<Scalars['JSON']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Explanation = {
  __typename?: 'version_explanation';
  Ref_Key?: Maybe<Scalars['JSON']>;
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  explanation?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  show_title?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_created?: Maybe<Scalars['JSON']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Global_Notifications = {
  __typename?: 'version_global_notifications';
  Title?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
  message_type?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  user_created?: Maybe<Scalars['JSON']>;
};

export type Version_Match = {
  __typename?: 'version_match';
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  explanation?: Maybe<Scalars['JSON']>;
  gender?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  max?: Maybe<Scalars['Float']>;
  max_age?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  min_age?: Maybe<Scalars['Float']>;
  refKey?: Maybe<Scalars['JSON']>;
  status?: Maybe<Scalars['String']>;
  user_created?: Maybe<Scalars['JSON']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Option = {
  __typename?: 'version_option';
  id?: Maybe<Scalars['ID']>;
  option_group?: Maybe<Scalars['JSON']>;
  sort?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type Version_Option_Group = {
  __typename?: 'version_option_group';
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  options?: Maybe<Scalars['JSON']>;
  title?: Maybe<Scalars['String']>;
};

export type Version_Question = {
  __typename?: 'version_question';
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  instructions?: Maybe<Scalars['String']>;
  option_group?: Maybe<Scalars['JSON']>;
  question?: Maybe<Scalars['String']>;
  question_set?: Maybe<Scalars['JSON']>;
  sort?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['JSON']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Question_Set = {
  __typename?: 'version_question_set';
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  instructions?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  questionnaires?: Maybe<Scalars['JSON']>;
  questions?: Maybe<Scalars['JSON']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Version_Questionnaire = {
  __typename?: 'version_questionnaire';
  answer_group?: Maybe<Scalars['JSON']>;
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  instructions?: Maybe<Scalars['String']>;
  question_sets?: Maybe<Scalars['JSON']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_created?: Maybe<Scalars['JSON']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Questionnaire_Conclusion = {
  __typename?: 'version_questionnaire_conclusion';
  content?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  questionnaire?: Maybe<Scalars['JSON']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_created?: Maybe<Scalars['JSON']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Questionnaire_Question_Set = {
  __typename?: 'version_questionnaire_question_set';
  id?: Maybe<Scalars['ID']>;
  optional?: Maybe<Scalars['Boolean']>;
  question_set_id?: Maybe<Scalars['JSON']>;
  questionnaire_id?: Maybe<Scalars['JSON']>;
};

export type Version_Tutorials = {
  __typename?: 'version_tutorials';
  body?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  user_created?: Maybe<Scalars['JSON']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

export type Version_Values = {
  __typename?: 'version_values';
  abs_max?: Maybe<Scalars['Float']>;
  abs_min?: Maybe<Scalars['Float']>;
  date_created?: Maybe<Scalars['Date']>;
  date_updated?: Maybe<Scalars['Date']>;
  grouping?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  ideal_max?: Maybe<Scalars['Float']>;
  ideal_min?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  title_alt?: Maybe<Scalars['String']>;
  user_created?: Maybe<Scalars['JSON']>;
  user_updated?: Maybe<Scalars['JSON']>;
};

/** Whole Body Composition from RJL Systems */
export type Whole_Body_Comp = {
  __typename?: 'whole_body_comp';
  age: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  ecw: Scalars['numeric'];
  gender: Scalars['Int'];
  height: Scalars['Int'];
  icw: Scalars['numeric'];
  id: Scalars['uuid'];
  owner: Scalars['String'];
  phase_angle: Scalars['numeric'];
  reactance: Scalars['numeric'];
  resistance: Scalars['numeric'];
  tbw: Scalars['numeric'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  weight: Scalars['Int'];
};

/** aggregated selection of "whole_body_comp" */
export type Whole_Body_Comp_Aggregate = {
  __typename?: 'whole_body_comp_aggregate';
  aggregate?: Maybe<Whole_Body_Comp_Aggregate_Fields>;
  nodes: Array<Whole_Body_Comp>;
};

/** aggregate fields of "whole_body_comp" */
export type Whole_Body_Comp_Aggregate_Fields = {
  __typename?: 'whole_body_comp_aggregate_fields';
  avg?: Maybe<Whole_Body_Comp_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Whole_Body_Comp_Max_Fields>;
  min?: Maybe<Whole_Body_Comp_Min_Fields>;
  stddev?: Maybe<Whole_Body_Comp_Stddev_Fields>;
  stddev_pop?: Maybe<Whole_Body_Comp_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Whole_Body_Comp_Stddev_Samp_Fields>;
  sum?: Maybe<Whole_Body_Comp_Sum_Fields>;
  var_pop?: Maybe<Whole_Body_Comp_Var_Pop_Fields>;
  var_samp?: Maybe<Whole_Body_Comp_Var_Samp_Fields>;
  variance?: Maybe<Whole_Body_Comp_Variance_Fields>;
};


/** aggregate fields of "whole_body_comp" */
export type Whole_Body_Comp_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Whole_Body_Comp_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Whole_Body_Comp_Avg_Fields = {
  __typename?: 'whole_body_comp_avg_fields';
  age?: Maybe<Scalars['Float']>;
  ecw?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  icw?: Maybe<Scalars['Float']>;
  phase_angle?: Maybe<Scalars['Float']>;
  reactance?: Maybe<Scalars['Float']>;
  resistance?: Maybe<Scalars['Float']>;
  tbw?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "whole_body_comp". All fields are combined with a logical 'AND'. */
export type Whole_Body_Comp_Bool_Exp = {
  _and?: InputMaybe<Array<Whole_Body_Comp_Bool_Exp>>;
  _not?: InputMaybe<Whole_Body_Comp_Bool_Exp>;
  _or?: InputMaybe<Array<Whole_Body_Comp_Bool_Exp>>;
  age?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  ecw?: InputMaybe<Numeric_Comparison_Exp>;
  gender?: InputMaybe<Int_Comparison_Exp>;
  height?: InputMaybe<Int_Comparison_Exp>;
  icw?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  owner?: InputMaybe<String_Comparison_Exp>;
  phase_angle?: InputMaybe<Numeric_Comparison_Exp>;
  reactance?: InputMaybe<Numeric_Comparison_Exp>;
  resistance?: InputMaybe<Numeric_Comparison_Exp>;
  tbw?: InputMaybe<Numeric_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  weight?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "whole_body_comp" */
export enum Whole_Body_Comp_Constraint {
  /** unique or primary key constraint on columns "id" */
  WholeBodyCompPkey = 'whole_body_comp_pkey'
}

/** input type for incrementing numeric columns in table "whole_body_comp" */
export type Whole_Body_Comp_Inc_Input = {
  age?: InputMaybe<Scalars['Int']>;
  ecw?: InputMaybe<Scalars['numeric']>;
  gender?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  icw?: InputMaybe<Scalars['numeric']>;
  phase_angle?: InputMaybe<Scalars['numeric']>;
  reactance?: InputMaybe<Scalars['numeric']>;
  resistance?: InputMaybe<Scalars['numeric']>;
  tbw?: InputMaybe<Scalars['numeric']>;
  weight?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "whole_body_comp" */
export type Whole_Body_Comp_Insert_Input = {
  age?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  ecw?: InputMaybe<Scalars['numeric']>;
  gender?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  icw?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner?: InputMaybe<Scalars['String']>;
  phase_angle?: InputMaybe<Scalars['numeric']>;
  reactance?: InputMaybe<Scalars['numeric']>;
  resistance?: InputMaybe<Scalars['numeric']>;
  tbw?: InputMaybe<Scalars['numeric']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  weight?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Whole_Body_Comp_Max_Fields = {
  __typename?: 'whole_body_comp_max_fields';
  age?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  ecw?: Maybe<Scalars['numeric']>;
  gender?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  icw?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['String']>;
  phase_angle?: Maybe<Scalars['numeric']>;
  reactance?: Maybe<Scalars['numeric']>;
  resistance?: Maybe<Scalars['numeric']>;
  tbw?: Maybe<Scalars['numeric']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  weight?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Whole_Body_Comp_Min_Fields = {
  __typename?: 'whole_body_comp_min_fields';
  age?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  ecw?: Maybe<Scalars['numeric']>;
  gender?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  icw?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['String']>;
  phase_angle?: Maybe<Scalars['numeric']>;
  reactance?: Maybe<Scalars['numeric']>;
  resistance?: Maybe<Scalars['numeric']>;
  tbw?: Maybe<Scalars['numeric']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  weight?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "whole_body_comp" */
export type Whole_Body_Comp_Mutation_Response = {
  __typename?: 'whole_body_comp_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Whole_Body_Comp>;
};

/** on_conflict condition type for table "whole_body_comp" */
export type Whole_Body_Comp_On_Conflict = {
  constraint: Whole_Body_Comp_Constraint;
  update_columns?: Array<Whole_Body_Comp_Update_Column>;
  where?: InputMaybe<Whole_Body_Comp_Bool_Exp>;
};

/** Ordering options when selecting data from "whole_body_comp". */
export type Whole_Body_Comp_Order_By = {
  age?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  ecw?: InputMaybe<Order_By>;
  gender?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
  icw?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  phase_angle?: InputMaybe<Order_By>;
  reactance?: InputMaybe<Order_By>;
  resistance?: InputMaybe<Order_By>;
  tbw?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** primary key columns input for table: whole_body_comp */
export type Whole_Body_Comp_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "whole_body_comp" */
export enum Whole_Body_Comp_Select_Column {
  /** column name */
  Age = 'age',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Ecw = 'ecw',
  /** column name */
  Gender = 'gender',
  /** column name */
  Height = 'height',
  /** column name */
  Icw = 'icw',
  /** column name */
  Id = 'id',
  /** column name */
  Owner = 'owner',
  /** column name */
  PhaseAngle = 'phase_angle',
  /** column name */
  Reactance = 'reactance',
  /** column name */
  Resistance = 'resistance',
  /** column name */
  Tbw = 'tbw',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Weight = 'weight'
}

/** input type for updating data in table "whole_body_comp" */
export type Whole_Body_Comp_Set_Input = {
  age?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  ecw?: InputMaybe<Scalars['numeric']>;
  gender?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  icw?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner?: InputMaybe<Scalars['String']>;
  phase_angle?: InputMaybe<Scalars['numeric']>;
  reactance?: InputMaybe<Scalars['numeric']>;
  resistance?: InputMaybe<Scalars['numeric']>;
  tbw?: InputMaybe<Scalars['numeric']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  weight?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Whole_Body_Comp_Stddev_Fields = {
  __typename?: 'whole_body_comp_stddev_fields';
  age?: Maybe<Scalars['Float']>;
  ecw?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  icw?: Maybe<Scalars['Float']>;
  phase_angle?: Maybe<Scalars['Float']>;
  reactance?: Maybe<Scalars['Float']>;
  resistance?: Maybe<Scalars['Float']>;
  tbw?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Whole_Body_Comp_Stddev_Pop_Fields = {
  __typename?: 'whole_body_comp_stddev_pop_fields';
  age?: Maybe<Scalars['Float']>;
  ecw?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  icw?: Maybe<Scalars['Float']>;
  phase_angle?: Maybe<Scalars['Float']>;
  reactance?: Maybe<Scalars['Float']>;
  resistance?: Maybe<Scalars['Float']>;
  tbw?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Whole_Body_Comp_Stddev_Samp_Fields = {
  __typename?: 'whole_body_comp_stddev_samp_fields';
  age?: Maybe<Scalars['Float']>;
  ecw?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  icw?: Maybe<Scalars['Float']>;
  phase_angle?: Maybe<Scalars['Float']>;
  reactance?: Maybe<Scalars['Float']>;
  resistance?: Maybe<Scalars['Float']>;
  tbw?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "whole_body_comp" */
export type Whole_Body_Comp_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Whole_Body_Comp_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Whole_Body_Comp_Stream_Cursor_Value_Input = {
  age?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  ecw?: InputMaybe<Scalars['numeric']>;
  gender?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  icw?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner?: InputMaybe<Scalars['String']>;
  phase_angle?: InputMaybe<Scalars['numeric']>;
  reactance?: InputMaybe<Scalars['numeric']>;
  resistance?: InputMaybe<Scalars['numeric']>;
  tbw?: InputMaybe<Scalars['numeric']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  weight?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Whole_Body_Comp_Sum_Fields = {
  __typename?: 'whole_body_comp_sum_fields';
  age?: Maybe<Scalars['Int']>;
  ecw?: Maybe<Scalars['numeric']>;
  gender?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  icw?: Maybe<Scalars['numeric']>;
  phase_angle?: Maybe<Scalars['numeric']>;
  reactance?: Maybe<Scalars['numeric']>;
  resistance?: Maybe<Scalars['numeric']>;
  tbw?: Maybe<Scalars['numeric']>;
  weight?: Maybe<Scalars['Int']>;
};

/** update columns of table "whole_body_comp" */
export enum Whole_Body_Comp_Update_Column {
  /** column name */
  Age = 'age',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Ecw = 'ecw',
  /** column name */
  Gender = 'gender',
  /** column name */
  Height = 'height',
  /** column name */
  Icw = 'icw',
  /** column name */
  Id = 'id',
  /** column name */
  Owner = 'owner',
  /** column name */
  PhaseAngle = 'phase_angle',
  /** column name */
  Reactance = 'reactance',
  /** column name */
  Resistance = 'resistance',
  /** column name */
  Tbw = 'tbw',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Weight = 'weight'
}

export type Whole_Body_Comp_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Whole_Body_Comp_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Whole_Body_Comp_Set_Input>;
  /** filter the rows which have to be updated */
  where: Whole_Body_Comp_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Whole_Body_Comp_Var_Pop_Fields = {
  __typename?: 'whole_body_comp_var_pop_fields';
  age?: Maybe<Scalars['Float']>;
  ecw?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  icw?: Maybe<Scalars['Float']>;
  phase_angle?: Maybe<Scalars['Float']>;
  reactance?: Maybe<Scalars['Float']>;
  resistance?: Maybe<Scalars['Float']>;
  tbw?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Whole_Body_Comp_Var_Samp_Fields = {
  __typename?: 'whole_body_comp_var_samp_fields';
  age?: Maybe<Scalars['Float']>;
  ecw?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  icw?: Maybe<Scalars['Float']>;
  phase_angle?: Maybe<Scalars['Float']>;
  reactance?: Maybe<Scalars['Float']>;
  resistance?: Maybe<Scalars['Float']>;
  tbw?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Whole_Body_Comp_Variance_Fields = {
  __typename?: 'whole_body_comp_variance_fields';
  age?: Maybe<Scalars['Float']>;
  ecw?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  icw?: Maybe<Scalars['Float']>;
  phase_angle?: Maybe<Scalars['Float']>;
  reactance?: Maybe<Scalars['Float']>;
  resistance?: Maybe<Scalars['Float']>;
  tbw?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

export type GetPractitionerPatientsQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type GetPractitionerPatientsQuery = { __typename?: 'query_root', followers: Array<{ __typename?: 'followers', accepted_on?: any | null, id: any, followee?: { __typename?: 'User', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, birthDate?: string | null } | null }>, all: { __typename?: 'followers_aggregate', aggregate?: { __typename?: 'followers_aggregate_fields', count: number } | null }, accepted: { __typename?: 'followers_aggregate', aggregate?: { __typename?: 'followers_aggregate_fields', count: number } | null }, pending: { __typename?: 'followers_aggregate', aggregate?: { __typename?: 'followers_aggregate_fields', count: number } | null } };

export type GetAllHeartDataForOwnerQueryVariables = Exact<{
  id: Scalars['uuid'];
  _eq: Scalars['String'];
  order_by?: InputMaybe<Order_By>;
  where?: InputMaybe<Heart_Data_Bool_Exp>;
}>;


export type GetAllHeartDataForOwnerQuery = { __typename?: 'query_root', user?: { __typename?: 'User', firstName?: string | null, birthDate?: string | null, email?: string | null } | null, users_by_pk?: { __typename?: 'users', data?: string | null, birth_date?: any | null, first_name?: string | null, last_name?: string | null, mobile_phone?: string | null } | null, heart_data: Array<{ __typename?: 'heart_data', id: any, title: string, data?: any | null, created_on: any, trend_recording: boolean, rr_file?: { __typename?: 'rr_files', id: any } | null, ecg_file?: { __typename?: 'ecg_files', id: any } | null, rr_metadata?: { __typename?: 'rr_metadata', id: any, max: any, mean: any, min: any, owner_id: string, threshold: number, rrs: any, total_filtered_rr: number, total_rejected: number, total_rr: number } | null, brain_spectrum?: { __typename?: 'brain_spectrum', id: any, delta: any, theta: any, alpha: any, beta: any, hbeta: any } | null }> };

export type GetBrainDescriptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBrainDescriptionQuery = { __typename?: 'query_root', descriptions: Array<{ __typename?: 'descriptions', key: string, hq_professional?: string | null }> };

export type GetDescriptionByKeyQueryVariables = Exact<{
  key: Scalars['String'];
}>;


export type GetDescriptionByKeyQuery = { __typename?: 'query_root', descriptions: Array<{ __typename?: 'descriptions', status?: string | null, hq_professional?: string | null }> };

export type DeleteRecordingMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteRecordingMutation = { __typename?: 'mutation_root', update_heart_data_by_pk?: { __typename?: 'heart_data', id: any, title: string, deleted_on?: any | null } | null };

export type UpdateRecordingByPkMutationVariables = Exact<{
  id: Scalars['uuid'];
  title: Scalars['String'];
  trend_recording: Scalars['Boolean'];
}>;


export type UpdateRecordingByPkMutation = { __typename?: 'mutation_root', update_heart_data_by_pk?: { __typename?: 'heart_data', id: any, title: string, trend_recording: boolean } | null };

export type GetVagalNerveQuestionsQueryVariables = Exact<{
  heart_data_ref: Scalars['uuid'];
  survey_ref: Scalars['Int'];
}>;


export type GetVagalNerveQuestionsQuery = { __typename?: 'query_root', get_heart_data_answers: Array<{ __typename?: 'v_question_answer', answer_id: any, answer: boolean, question_id: number, question: string, heart_data_id: any, survey_id: number }> };

export type InsertAnswerOneMutationVariables = Exact<{
  answer: Scalars['Boolean'];
  question_id: Scalars['Int'];
  heart_data_id: Scalars['uuid'];
}>;


export type InsertAnswerOneMutation = { __typename?: 'mutation_root', insert_v_answer_one?: { __typename?: 'v_answer', id: any, answer: boolean } | null };

export type UpdateAnswerByPkMutationVariables = Exact<{
  id: Scalars['bigint'];
  answer: Scalars['Boolean'];
}>;


export type UpdateAnswerByPkMutation = { __typename?: 'mutation_root', update_v_answer_by_pk?: { __typename?: 'v_answer', id: any, answer: boolean } | null };

export type DoctorFollowUserMutationVariables = Exact<{
  follower_id?: InputMaybe<Scalars['String']>;
  followee_id?: InputMaybe<Scalars['String']>;
  accepted_on?: InputMaybe<Scalars['timestamptz']>;
}>;


export type DoctorFollowUserMutation = { __typename?: 'mutation_root', insert_followers_one?: { __typename?: 'followers', id: any } | null };

export type GetUsersByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUsersByEmailQuery = { __typename?: 'query_root', userByEmail?: { __typename?: 'FindUserResult', total?: number | null, users?: Array<{ __typename?: 'User', id?: string | null, email?: string | null, birthDate?: string | null, active?: boolean | null, firstName?: string | null, fullName?: string | null, lastName?: string | null, username?: string | null } | null> | null } | null };

export type GetNotesForRecordingQueryVariables = Exact<{
  heart_data_id: Scalars['uuid'];
}>;


export type GetNotesForRecordingQuery = { __typename?: 'query_root', note: Array<{ __typename?: 'note', id: any, note: any, author_id: string, heart_data_id: any, created_at: any, updated_at: any }> };

export type Delete_Note_By_PkMutationVariables = Exact<{
  id: Scalars['bigint'];
}>;


export type Delete_Note_By_PkMutation = { __typename?: 'mutation_root', delete_note_by_pk?: { __typename?: 'note', id: any } | null };

export type InsertOneNoteForRecordingMutationVariables = Exact<{
  heart_data_id: Scalars['uuid'];
  author_id: Scalars['String'];
  note: Scalars['json'];
  text: Scalars['String'];
}>;


export type InsertOneNoteForRecordingMutation = { __typename?: 'mutation_root', insert_note_one?: { __typename?: 'note', id: any, heart_data_id: any, author_id: string, note: any, created_at: any, updated_at: any } | null };

export type UpdateNoteByPkMutationVariables = Exact<{
  note: Scalars['json'];
  text: Scalars['String'];
  id: Scalars['bigint'];
}>;


export type UpdateNoteByPkMutation = { __typename?: 'mutation_root', update_note_by_pk?: { __typename?: 'note', id: any, note: any } | null };

export type UpdateUserProfileMutationVariables = Exact<{
  userId: Scalars['String'];
  userDetails: UserDetails;
}>;


export type UpdateUserProfileMutation = { __typename?: 'mutation_root', PatchUser?: { __typename?: 'PatchUserOutput', user?: { __typename?: 'PatchedUser', birthDate?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, data?: { __typename?: 'PatchedUserData', gender?: string | null } | null } | null } | null };

export type UnfollowSubjectMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type UnfollowSubjectMutation = { __typename?: 'mutation_root', update_followers_by_pk?: { __typename?: 'followers', id: any } | null };

export type GetValuesParametersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetValuesParametersQuery = { __typename?: 'query_root', values: Array<{ __typename?: 'values', id: string, title?: string | null, title_alt?: string | null, ideal_max?: number | null, ideal_min?: number | null, abs_max?: number | null, abs_min?: number | null, status?: string | null }> };

export type GetSpecificExplanationQueryVariables = Exact<{
  age: Scalars['GraphQLStringOrFloat'];
  status?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type GetSpecificExplanationQuery = { __typename?: 'query_root', match: Array<{ __typename?: 'match', max?: number | null, min?: number | null, max_age?: number | null, min_age?: number | null, gender?: string | null, status?: string | null, refKey?: { __typename?: 'values', id: string } | null, explanation?: { __typename?: 'explanation', title?: string | null, explanation?: string | null } | null }> };

export type GetSpecificExplanationByKeyValueQueryVariables = Exact<{
  age: Scalars['GraphQLStringOrFloat'];
  status?: InputMaybe<Scalars['String']>;
  value: Scalars['GraphQLStringOrFloat'];
  refKey: Scalars['String'];
  gender?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type GetSpecificExplanationByKeyValueQuery = { __typename?: 'query_root', match: Array<{ __typename?: 'match', max?: number | null, min?: number | null, max_age?: number | null, min_age?: number | null, gender?: string | null, status?: string | null, refKey?: { __typename?: 'values', id: string } | null, explanation?: { __typename?: 'explanation', title?: string | null, explanation?: string | null } | null }> };

export type GetSolutionsAndCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSolutionsAndCategoryQuery = { __typename?: 'query_root', Solution: Array<{ __typename?: 'Solution', id: string, title?: string | null, tags?: any | null, category?: { __typename?: 'Solution_Category', id: string, name?: string | null } | null }> };

export type GetSingleSolutionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSingleSolutionQuery = { __typename?: 'query_root', Solution_by_id?: { __typename?: 'Solution', id: string, tags?: any | null, title?: string | null, content?: string | null, category?: { __typename?: 'Solution_Category', id: string, name?: string | null } | null } | null };

export type GetBrainGaugeDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBrainGaugeDetailsQuery = { __typename?: 'query_root', bg_parameters: Array<{ __typename?: 'bg_parameters', id: string, key?: string | null, name?: string | null, explanation?: string | null }> };

export type GetBrainGaugeRawScoresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBrainGaugeRawScoresQuery = { __typename?: 'query_root', BG_Raw_Scores: Array<{ __typename?: 'BG_Raw_Scores', id: string, key?: string | null, name?: string | null, explanation?: string | null }> };

export type DisclaimerQueryQueryVariables = Exact<{
  id: Scalars['ID'];
  disclaimerId: Scalars['GraphQLStringOrFloat'];
  userId: Scalars['String'];
}>;


export type DisclaimerQueryQuery = { __typename?: 'query_root', Disclaimer_Acknowledgement: Array<{ __typename?: 'Disclaimer_Acknowledgement', id: string, UserId?: string | null, Disclaimer?: { __typename?: 'Disclaimers', id: string, Title?: string | null, Disclaimer?: string | null } | null }>, Disclaimers_by_id?: { __typename?: 'Disclaimers', id: string, Title?: string | null, Disclaimer?: string | null } | null };

export type UpdateDisclaimerAgreementMutationVariables = Exact<{
  date_updated?: InputMaybe<Scalars['Date']>;
  disclaimerAgreementId: Scalars['ID'];
}>;


export type UpdateDisclaimerAgreementMutation = { __typename?: 'mutation_root', update_Disclaimer_Acknowledgement_item?: { __typename?: 'Disclaimer_Acknowledgement', UserId?: string | null, date_created?: any | null, date_updated?: any | null } | null };

export type CreateDisclaimerAgreementMutationVariables = Exact<{
  disclaimerId: Scalars['ID'];
  UserId: Scalars['String'];
}>;


export type CreateDisclaimerAgreementMutation = { __typename?: 'mutation_root', create_Disclaimer_Acknowledgement_item?: { __typename?: 'Disclaimer_Acknowledgement', id: string } | null };

export type GetQuestionnairesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuestionnairesQuery = { __typename?: 'query_root', questionnaire: Array<{ __typename?: 'questionnaire', id: string, title?: string | null }> };

export type GetQuestionSetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuestionSetsQuery = { __typename?: 'query_root', question_set: Array<{ __typename?: 'question_set', id: string, title?: string | null, questionnaires?: Array<{ __typename?: 'questionnaire_question_set', questionnaire_id?: { __typename?: 'questionnaire', id: string, title?: string | null } | null } | null> | null }> };

export type GetQuestionSetByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetQuestionSetByIdQuery = { __typename?: 'query_root', question_set_by_id?: { __typename?: 'question_set', id: string, title?: string | null, instructions?: string | null, questions?: Array<{ __typename?: 'question', id: string, question?: string | null, instructions?: string | null, option_group?: { __typename?: 'option_group', id: string, options?: Array<{ __typename?: 'option', id: string, title?: string | null, value?: number | null } | null> | null } | null } | null> | null } | null };

export type CreateAnswersMutationVariables = Exact<{
  owner_id: Scalars['String'];
  question_set: Scalars['ID'];
  answers?: InputMaybe<Array<Create_Answer_Input> | Create_Answer_Input>;
}>;


export type CreateAnswersMutation = { __typename?: 'mutation_root', create_answer_set_item?: { __typename?: 'answer_set', id: string, answers?: Array<{ __typename?: 'answer', option?: { __typename?: 'option', id: string, title?: string | null, value?: number | null } | null, question?: { __typename?: 'question', id: string, question?: string | null } | null } | null> | null } | null };

export type GetAnswerSetAnswersForUserQueryVariables = Exact<{
  owner_id: Scalars['String'];
  question_set_id: Scalars['GraphQLStringOrFloat'];
  question_set_id_ID: Scalars['ID'];
}>;


export type GetAnswerSetAnswersForUserQuery = { __typename?: 'query_root', question_set_by_id?: { __typename?: 'question_set', id: string, title?: string | null, instructions?: string | null } | null, answer_set: Array<{ __typename?: 'answer_set', id: string, date_created?: any | null, answers?: Array<{ __typename?: 'answer', option?: { __typename?: 'option', id: string, title?: string | null, value?: number | null } | null } | null> | null }> };

export type GetAnswerSetByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAnswerSetByIdQuery = { __typename?: 'query_root', answer_set_by_id?: { __typename?: 'answer_set', id: string, date_created?: any | null, question_set?: { __typename?: 'question_set', title?: string | null, instructions?: string | null } | null, answers?: Array<{ __typename?: 'answer', option?: { __typename?: 'option', id: string, title?: string | null, value?: number | null } | null, question?: { __typename?: 'question', id: string, question?: string | null, instructions?: string | null, option_group?: { __typename?: 'option_group', options?: Array<{ __typename?: 'option', id: string, title?: string | null, value?: number | null, option_group?: { __typename?: 'option_group', options?: Array<{ __typename?: 'option', id: string, title?: string | null, sort?: number | null, value?: number | null } | null> | null } | null } | null> | null } | null } | null } | null> | null } | null };

export type GetQuestionnaireByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetQuestionnaireByIdQuery = { __typename?: 'query_root', questionnaire_by_id?: { __typename?: 'questionnaire', id: string, title?: string | null, question_sets?: Array<{ __typename?: 'questionnaire_question_set', question_set_id?: { __typename?: 'question_set', id: string, title?: string | null, instructions?: string | null, questions?: Array<{ __typename?: 'question', id: string, instructions?: string | null, question?: string | null, option_group?: { __typename?: 'option_group', id: string, options?: Array<{ __typename?: 'option', id: string, title?: string | null, value?: number | null } | null> | null } | null } | null> | null } | null } | null> | null } | null };

export type CreateAnswerGroupMutationVariables = Exact<{
  owner_id: Scalars['String'];
  questionnaireId: Scalars['ID'];
  answerSets?: InputMaybe<Array<Create_Answer_Set_Input> | Create_Answer_Set_Input>;
}>;


export type CreateAnswerGroupMutation = { __typename?: 'mutation_root', create_answer_group_item?: { __typename?: 'answer_group', id: string, owner_id?: string | null, questionnaire?: { __typename?: 'questionnaire', id: string, title?: string | null } | null, answer_sets?: Array<{ __typename?: 'answer_set', id: string, answers?: Array<{ __typename?: 'answer', question?: { __typename?: 'question', question?: string | null } | null, option?: { __typename?: 'option', id: string, title?: string | null, value?: number | null } | null } | null> | null } | null> | null } | null };

export type GetQuestionnaireAnswerSetSQueryVariables = Exact<{
  owner_id: Scalars['String'];
  questionnaireId: Scalars['GraphQLStringOrFloat'];
}>;


export type GetQuestionnaireAnswerSetSQuery = { __typename?: 'query_root', answer_group: Array<{ __typename?: 'answer_group', id: string, owner_id?: string | null, date_created?: any | null }> };

export type GetAnswerGroupByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAnswerGroupByIdQuery = { __typename?: 'query_root', answer_group_by_id?: { __typename?: 'answer_group', answer_sets?: Array<{ __typename?: 'answer_set', id: string, question_set?: { __typename?: 'question_set', id: string, key?: string | null, title?: string | null } | null, answers?: Array<{ __typename?: 'answer', question?: { __typename?: 'question', id: string, question?: string | null } | null, option?: { __typename?: 'option', id: string, title?: string | null, value?: number | null, option_group?: { __typename?: 'option_group', options?: Array<{ __typename?: 'option', id: string, title?: string | null, value?: number | null } | null> | null } | null } | null } | null> | null } | null> | null } | null };

export type GetTutorialsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTutorialsQuery = { __typename?: 'query_root', tutorials: Array<{ __typename?: 'tutorials', id: string, title?: string | null, type?: string | null, sort?: number | null }> };

export type GetTutorialByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTutorialByIdQuery = { __typename?: 'query_root', tutorials_by_id?: { __typename?: 'tutorials', id: string, type?: string | null, title?: string | null, body?: string | null, date_created?: any | null, date_updated?: any | null } | null };

export type GetQuestionnaireConclusionsQueryVariables = Exact<{
  questionnaire_eq: Scalars['GraphQLStringOrFloat'];
}>;


export type GetQuestionnaireConclusionsQuery = { __typename?: 'query_root', questionnaire_conclusion: Array<{ __typename?: 'questionnaire_conclusion', id: string, title?: string | null, content?: string | null }> };

export type InsertOneWholeBodyCompMutationVariables = Exact<{
  age: Scalars['Int'];
  ecw: Scalars['numeric'];
  gender: Scalars['Int'];
  height: Scalars['Int'];
  icw: Scalars['numeric'];
  owner: Scalars['String'];
  phase_angle: Scalars['numeric'];
  reactance: Scalars['numeric'];
  resistance: Scalars['numeric'];
  tbw: Scalars['numeric'];
  title: Scalars['String'];
  weight: Scalars['Int'];
}>;


export type InsertOneWholeBodyCompMutation = { __typename?: 'mutation_root', insert_whole_body_comp_one?: { __typename?: 'whole_body_comp', id: any, title: string, age: number, ecw: any, gender: number, height: number, icw: any, owner: string, phase_angle: any, reactance: any, resistance: any, tbw: any, weight: number } | null };

export type GetWholeBodyCompByOwnerQueryVariables = Exact<{
  owner: Scalars['String'];
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetWholeBodyCompByOwnerQuery = { __typename?: 'query_root', whole_body_comp: Array<{ __typename?: 'whole_body_comp', id: any, title: string, owner: string, reactance: any, resistance: any, gender: number, ecw: any, created_at: any, age: number, height: number, icw: any, phase_angle: any, tbw: any, updated_at: any, weight: number }> };

export type UpdateWholeBodyCompTitleMutationVariables = Exact<{
  id: Scalars['uuid'];
  title: Scalars['String'];
}>;


export type UpdateWholeBodyCompTitleMutation = { __typename?: 'mutation_root', update_whole_body_comp_by_pk?: { __typename?: 'whole_body_comp', age: number, created_at: any, ecw: any, gender: number, height: number, icw: any, id: any, owner: string, phase_angle: any, reactance: any, resistance: any, tbw: any, title: string, updated_at: any, weight: number } | null };

export type DeleteWholeBodyCompTitleMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteWholeBodyCompTitleMutation = { __typename?: 'mutation_root', delete_whole_body_comp_by_pk?: { __typename?: 'whole_body_comp', id: any, title: string } | null };

export type GetSubjectDetailsQueryVariables = Exact<{
  id: Scalars['uuid'];
  _eq: Scalars['String'];
}>;


export type GetSubjectDetailsQuery = { __typename?: 'query_root', user?: { __typename?: 'User', firstName?: string | null, birthDate?: string | null, email?: string | null } | null, users_by_pk?: { __typename?: 'users', data?: string | null, birth_date?: any | null, first_name?: string | null, last_name?: string | null, mobile_phone?: string | null } | null };

export type GetSubjectHeartDataRangeQueryVariables = Exact<{
  id: Scalars['String'];
  order_by?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Scalars['timestamptz']>;
  end_date?: InputMaybe<Scalars['timestamptz']>;
}>;


export type GetSubjectHeartDataRangeQuery = { __typename?: 'query_root', heart_data: Array<{ __typename?: 'heart_data', id: any, title: string, data?: any | null, created_on: any, trend_recording: boolean, rr_file?: { __typename?: 'rr_files', id: any } | null, ecg_file?: { __typename?: 'ecg_files', id: any } | null, rr_metadata?: { __typename?: 'rr_metadata', id: any, max: any, mean: any, min: any, owner_id: string, threshold: number, total_filtered_rr: number, total_rejected: number, total_rr: number } | null }> };

export type GetUserFollowingQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserFollowingQuery = { __typename?: 'query_root', all: { __typename?: 'followers_aggregate', aggregate?: { __typename?: 'followers_aggregate_fields', count: number } | null }, accepted: { __typename?: 'followers_aggregate', aggregate?: { __typename?: 'followers_aggregate_fields', count: number } | null }, pending: { __typename?: 'followers_aggregate', aggregate?: { __typename?: 'followers_aggregate_fields', count: number } | null }, followers: Array<{ __typename?: 'followers', accepted_on?: any | null, requested_on: any, id: any, followee_id: string }> };

export type GetFollowingByPartiesIdQueryVariables = Exact<{
  follower_id?: InputMaybe<Scalars['String']>;
  followee_id?: InputMaybe<Scalars['String']>;
}>;


export type GetFollowingByPartiesIdQuery = { __typename?: 'query_root', followers: Array<{ __typename?: 'followers', id: any, follower_id: string, followee_id: string, accepted_on?: any | null, deleted_on?: any | null, requested_on: any }> };

export type CompletelyRemoveFollowMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type CompletelyRemoveFollowMutation = { __typename?: 'mutation_root', delete_followers_by_pk?: { __typename?: 'followers', id: any } | null };

export type AcceptFollowingMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type AcceptFollowingMutation = { __typename?: 'mutation_root', update_followers_by_pk?: { __typename?: 'followers', id: any, accepted_on?: any | null } | null };

export type UpsertUserMetaDataMutationVariables = Exact<{
  id: Scalars['uuid'];
  metadata: Scalars['jsonb'];
}>;


export type UpsertUserMetaDataMutation = { __typename?: 'mutation_root', insert_user_metadata_one?: { __typename?: 'user_metadata', id: any, metadata: any, created_at: any, updated_at: any } | null };

export type GetUserMetaDataQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetUserMetaDataQuery = { __typename?: 'query_root', user_metadata_by_pk?: { __typename?: 'user_metadata', id: any, metadata: any, created_at: any, updated_at: any } | null };

export type GetAdrenalTestsByOwnerQueryVariables = Exact<{
  owner_id: Scalars['String'];
  created_at?: InputMaybe<Order_By>;
}>;


export type GetAdrenalTestsByOwnerQuery = { __typename?: 'query_root', adrenal_function_urine_test: Array<{ __typename?: 'adrenal_function_urine_test', id: any, title: string, drops: number, created_at: any, updated_at: any, owner_id: string }> };

export type DeleteAdrenalTestByIdMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteAdrenalTestByIdMutation = { __typename?: 'mutation_root', update_adrenal_function_urine_test_by_pk?: { __typename?: 'adrenal_function_urine_test', id: any } | null };

export type InsertAdrenalTestMutationVariables = Exact<{
  owner_id: Scalars['String'];
  title: Scalars['String'];
  drops: Scalars['Int'];
  created_at?: InputMaybe<Scalars['timestamptz']>;
}>;


export type InsertAdrenalTestMutation = { __typename?: 'mutation_root', insert_adrenal_function_urine_test_one?: { __typename?: 'adrenal_function_urine_test', id: any, drops: number, owner_id: string, title: string, created_at: any, updated_at: any } | null };

export type UpdateAdrenalTestMutationVariables = Exact<{
  id: Scalars['uuid'];
  _set?: InputMaybe<Adrenal_Function_Urine_Test_Set_Input>;
}>;


export type UpdateAdrenalTestMutation = { __typename?: 'mutation_root', update_adrenal_function_urine_test_by_pk?: { __typename?: 'adrenal_function_urine_test', id: any, owner_id: string, title: string, drops: number, deleted_at?: any | null, created_at: any, updated_at: any } | null };

export type GetOxidativeStressTestsByOwnerQueryVariables = Exact<{
  owner_id: Scalars['String'];
}>;


export type GetOxidativeStressTestsByOwnerQuery = { __typename?: 'query_root', oxidative_stress_test: Array<{ __typename?: 'oxidative_stress_test', id: any, owner_id: string, title: string, created_at: any, updated_at: any, deleted_at?: any | null, color: number }> };

export type InsertOxidativeStressTestMutationVariables = Exact<{
  owner_id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  color: Scalars['Int'];
}>;


export type InsertOxidativeStressTestMutation = { __typename?: 'mutation_root', insert_oxidative_stress_test_one?: { __typename?: 'oxidative_stress_test', id: any, owner_id: string, title: string, created_at: any, updated_at: any, deleted_at?: any | null, color: number } | null };

export type UpdateOxidativeStressTestMutationVariables = Exact<{
  id: Scalars['uuid'];
  _set?: InputMaybe<Oxidative_Stress_Test_Set_Input>;
}>;


export type UpdateOxidativeStressTestMutation = { __typename?: 'mutation_root', update_oxidative_stress_test_by_pk?: { __typename?: 'oxidative_stress_test', id: any, owner_id: string, title: string, created_at: any, updated_at: any, deleted_at?: any | null, color: number } | null };

export type DeleteOxidativeStressTestMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteOxidativeStressTestMutation = { __typename?: 'mutation_root', update_oxidative_stress_test_by_pk?: { __typename?: 'oxidative_stress_test', id: any, owner_id: string, title: string, created_at: any, updated_at: any, deleted_at?: any | null, color: number } | null };


export const GetPractitionerPatientsDocument = `
    query GetPractitionerPatients($_id: String!) {
  followers(where: {follower_id: {_eq: $_id}, deleted_on: {_is_null: true}}) {
    accepted_on
    id
    followee {
      id
      email
      firstName
      lastName
      birthDate
    }
  }
  all: followers_aggregate(
    where: {follower_id: {_eq: $_id}, deleted_on: {_is_null: true}}
  ) {
    aggregate {
      count
    }
  }
  accepted: followers_aggregate(
    where: {follower_id: {_eq: $_id}, accepted_on: {_is_null: false}}
  ) {
    aggregate {
      count
    }
  }
  pending: followers_aggregate(
    where: {follower_id: {_eq: $_id}, accepted_on: {_is_null: true}, deleted_on: {_is_null: true}}
  ) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetPractitionerPatientsQuery = <
      TData = GetPractitionerPatientsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetPractitionerPatientsQueryVariables,
      options?: UseQueryOptions<GetPractitionerPatientsQuery, TError, TData>
    ) =>
    useQuery<GetPractitionerPatientsQuery, TError, TData>(
      ['GetPractitionerPatients', variables],
      fetcher<GetPractitionerPatientsQuery, GetPractitionerPatientsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPractitionerPatientsDocument, variables),
      options
    );
export const GetAllHeartDataForOwnerDocument = `
    query GetAllHeartDataForOwner($id: uuid!, $_eq: String!, $order_by: order_by, $where: heart_data_bool_exp) {
  user(id: $_eq) {
    firstName
    birthDate
    email
  }
  users_by_pk(id: $id) {
    data
    birth_date
    first_name
    last_name
    mobile_phone
  }
  heart_data(order_by: {created_on: $order_by}, where: $where) {
    id
    title
    data
    created_on
    trend_recording
    rr_file {
      id
    }
    ecg_file {
      id
    }
    rr_metadata {
      id
      max
      mean
      min
      owner_id
      threshold
      rrs
      total_filtered_rr
      total_rejected
      total_rr
    }
    brain_spectrum {
      id
      delta
      theta
      alpha
      beta
      hbeta
    }
  }
}
    `;
export const useGetAllHeartDataForOwnerQuery = <
      TData = GetAllHeartDataForOwnerQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetAllHeartDataForOwnerQueryVariables,
      options?: UseQueryOptions<GetAllHeartDataForOwnerQuery, TError, TData>
    ) =>
    useQuery<GetAllHeartDataForOwnerQuery, TError, TData>(
      ['GetAllHeartDataForOwner', variables],
      fetcher<GetAllHeartDataForOwnerQuery, GetAllHeartDataForOwnerQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAllHeartDataForOwnerDocument, variables),
      options
    );
export const GetBrainDescriptionDocument = `
    query GetBrainDescription {
  descriptions(
    filter: {key: {_in: ["brain_20", "brain_30", "brain_50", "brain_60", "brain_80", "brain_100"]}}
    sort: "key"
  ) {
    key
    hq_professional
  }
}
    `;
export const useGetBrainDescriptionQuery = <
      TData = GetBrainDescriptionQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetBrainDescriptionQueryVariables,
      options?: UseQueryOptions<GetBrainDescriptionQuery, TError, TData>
    ) =>
    useQuery<GetBrainDescriptionQuery, TError, TData>(
      variables === undefined ? ['GetBrainDescription'] : ['GetBrainDescription', variables],
      fetcher<GetBrainDescriptionQuery, GetBrainDescriptionQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetBrainDescriptionDocument, variables),
      options
    );
export const GetDescriptionByKeyDocument = `
    query GetDescriptionByKey($key: String!) {
  descriptions(filter: {key: {_eq: $key}, status: {_eq: "published"}}) {
    status
    hq_professional
  }
}
    `;
export const useGetDescriptionByKeyQuery = <
      TData = GetDescriptionByKeyQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetDescriptionByKeyQueryVariables,
      options?: UseQueryOptions<GetDescriptionByKeyQuery, TError, TData>
    ) =>
    useQuery<GetDescriptionByKeyQuery, TError, TData>(
      ['GetDescriptionByKey', variables],
      fetcher<GetDescriptionByKeyQuery, GetDescriptionByKeyQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetDescriptionByKeyDocument, variables),
      options
    );
export const DeleteRecordingDocument = `
    mutation DeleteRecording($id: uuid!) {
  update_heart_data_by_pk(pk_columns: {id: $id}, _set: {deleted_on: "now()"}) {
    id
    title
    deleted_on
  }
}
    `;
export const useDeleteRecordingMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteRecordingMutation, TError, DeleteRecordingMutationVariables, TContext>
    ) =>
    useMutation<DeleteRecordingMutation, TError, DeleteRecordingMutationVariables, TContext>(
      ['DeleteRecording'],
      (variables?: DeleteRecordingMutationVariables) => fetcher<DeleteRecordingMutation, DeleteRecordingMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteRecordingDocument, variables)(),
      options
    );
export const UpdateRecordingByPkDocument = `
    mutation UpdateRecordingByPk($id: uuid!, $title: String!, $trend_recording: Boolean!) {
  update_heart_data_by_pk(
    pk_columns: {id: $id}
    _set: {title: $title, trend_recording: $trend_recording}
  ) {
    id
    title
    trend_recording
  }
}
    `;
export const useUpdateRecordingByPkMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateRecordingByPkMutation, TError, UpdateRecordingByPkMutationVariables, TContext>
    ) =>
    useMutation<UpdateRecordingByPkMutation, TError, UpdateRecordingByPkMutationVariables, TContext>(
      ['UpdateRecordingByPk'],
      (variables?: UpdateRecordingByPkMutationVariables) => fetcher<UpdateRecordingByPkMutation, UpdateRecordingByPkMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateRecordingByPkDocument, variables)(),
      options
    );
export const GetVagalNerveQuestionsDocument = `
    query GetVagalNerveQuestions($heart_data_ref: uuid!, $survey_ref: Int!) {
  get_heart_data_answers(
    args: {heart_data_ref: $heart_data_ref, survey_ref: $survey_ref}
  ) {
    answer_id
    answer
    question_id
    question
    heart_data_id
    survey_id
  }
}
    `;
export const useGetVagalNerveQuestionsQuery = <
      TData = GetVagalNerveQuestionsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetVagalNerveQuestionsQueryVariables,
      options?: UseQueryOptions<GetVagalNerveQuestionsQuery, TError, TData>
    ) =>
    useQuery<GetVagalNerveQuestionsQuery, TError, TData>(
      ['GetVagalNerveQuestions', variables],
      fetcher<GetVagalNerveQuestionsQuery, GetVagalNerveQuestionsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetVagalNerveQuestionsDocument, variables),
      options
    );
export const InsertAnswerOneDocument = `
    mutation InsertAnswerOne($answer: Boolean!, $question_id: Int!, $heart_data_id: uuid!) {
  insert_v_answer_one(
    object: {question_id: $question_id, heart_data_id: $heart_data_id, answer: $answer}
  ) {
    id
    answer
  }
}
    `;
export const useInsertAnswerOneMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<InsertAnswerOneMutation, TError, InsertAnswerOneMutationVariables, TContext>
    ) =>
    useMutation<InsertAnswerOneMutation, TError, InsertAnswerOneMutationVariables, TContext>(
      ['InsertAnswerOne'],
      (variables?: InsertAnswerOneMutationVariables) => fetcher<InsertAnswerOneMutation, InsertAnswerOneMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, InsertAnswerOneDocument, variables)(),
      options
    );
export const UpdateAnswerByPkDocument = `
    mutation UpdateAnswerByPk($id: bigint!, $answer: Boolean!) {
  update_v_answer_by_pk(pk_columns: {id: $id}, _set: {answer: $answer}) {
    id
    answer
  }
}
    `;
export const useUpdateAnswerByPkMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateAnswerByPkMutation, TError, UpdateAnswerByPkMutationVariables, TContext>
    ) =>
    useMutation<UpdateAnswerByPkMutation, TError, UpdateAnswerByPkMutationVariables, TContext>(
      ['UpdateAnswerByPk'],
      (variables?: UpdateAnswerByPkMutationVariables) => fetcher<UpdateAnswerByPkMutation, UpdateAnswerByPkMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateAnswerByPkDocument, variables)(),
      options
    );
export const DoctorFollowUserDocument = `
    mutation DoctorFollowUser($follower_id: String, $followee_id: String, $accepted_on: timestamptz = null) {
  insert_followers_one(
    object: {followee_id: $followee_id, follower_id: $follower_id, deleted_on: null, accepted_on: $accepted_on}
    on_conflict: {constraint: followers_followee_id_follower_id_key, update_columns: [deleted_on]}
  ) {
    id
  }
}
    `;
export const useDoctorFollowUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DoctorFollowUserMutation, TError, DoctorFollowUserMutationVariables, TContext>
    ) =>
    useMutation<DoctorFollowUserMutation, TError, DoctorFollowUserMutationVariables, TContext>(
      ['DoctorFollowUser'],
      (variables?: DoctorFollowUserMutationVariables) => fetcher<DoctorFollowUserMutation, DoctorFollowUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DoctorFollowUserDocument, variables)(),
      options
    );
export const GetUsersByEmailDocument = `
    query GetUsersByEmail($email: String!) {
  userByEmail(email: $email) {
    total
    users {
      id
      email
      birthDate
      active
      firstName
      fullName
      lastName
      username
    }
  }
}
    `;
export const useGetUsersByEmailQuery = <
      TData = GetUsersByEmailQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUsersByEmailQueryVariables,
      options?: UseQueryOptions<GetUsersByEmailQuery, TError, TData>
    ) =>
    useQuery<GetUsersByEmailQuery, TError, TData>(
      ['GetUsersByEmail', variables],
      fetcher<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUsersByEmailDocument, variables),
      options
    );
export const GetNotesForRecordingDocument = `
    query GetNotesForRecording($heart_data_id: uuid!) {
  note(where: {heart_data_id: {_eq: $heart_data_id}}) {
    id
    note
    author_id
    heart_data_id
    created_at
    updated_at
  }
}
    `;
export const useGetNotesForRecordingQuery = <
      TData = GetNotesForRecordingQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetNotesForRecordingQueryVariables,
      options?: UseQueryOptions<GetNotesForRecordingQuery, TError, TData>
    ) =>
    useQuery<GetNotesForRecordingQuery, TError, TData>(
      ['GetNotesForRecording', variables],
      fetcher<GetNotesForRecordingQuery, GetNotesForRecordingQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetNotesForRecordingDocument, variables),
      options
    );
export const Delete_Note_By_PkDocument = `
    mutation Delete_Note_By_PK($id: bigint!) {
  delete_note_by_pk(id: $id) {
    id
  }
}
    `;
export const useDelete_Note_By_PkMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<Delete_Note_By_PkMutation, TError, Delete_Note_By_PkMutationVariables, TContext>
    ) =>
    useMutation<Delete_Note_By_PkMutation, TError, Delete_Note_By_PkMutationVariables, TContext>(
      ['Delete_Note_By_PK'],
      (variables?: Delete_Note_By_PkMutationVariables) => fetcher<Delete_Note_By_PkMutation, Delete_Note_By_PkMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, Delete_Note_By_PkDocument, variables)(),
      options
    );
export const InsertOneNoteForRecordingDocument = `
    mutation InsertOneNoteForRecording($heart_data_id: uuid!, $author_id: String!, $note: json!, $text: String!) {
  insert_note_one(
    object: {heart_data_id: $heart_data_id, author_id: $author_id, note: $note, text: $text}
  ) {
    id
    heart_data_id
    author_id
    note
    created_at
    updated_at
  }
}
    `;
export const useInsertOneNoteForRecordingMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<InsertOneNoteForRecordingMutation, TError, InsertOneNoteForRecordingMutationVariables, TContext>
    ) =>
    useMutation<InsertOneNoteForRecordingMutation, TError, InsertOneNoteForRecordingMutationVariables, TContext>(
      ['InsertOneNoteForRecording'],
      (variables?: InsertOneNoteForRecordingMutationVariables) => fetcher<InsertOneNoteForRecordingMutation, InsertOneNoteForRecordingMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, InsertOneNoteForRecordingDocument, variables)(),
      options
    );
export const UpdateNoteByPkDocument = `
    mutation UpdateNoteByPk($note: json!, $text: String!, $id: bigint!) {
  update_note_by_pk(pk_columns: {id: $id}, _set: {note: $note, text: $text}) {
    id
    note
  }
}
    `;
export const useUpdateNoteByPkMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateNoteByPkMutation, TError, UpdateNoteByPkMutationVariables, TContext>
    ) =>
    useMutation<UpdateNoteByPkMutation, TError, UpdateNoteByPkMutationVariables, TContext>(
      ['UpdateNoteByPk'],
      (variables?: UpdateNoteByPkMutationVariables) => fetcher<UpdateNoteByPkMutation, UpdateNoteByPkMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateNoteByPkDocument, variables)(),
      options
    );
export const UpdateUserProfileDocument = `
    mutation UpdateUserProfile($userId: String!, $userDetails: UserDetails!) {
  PatchUser(userId: $userId, userDetails: $userDetails) {
    user {
      birthDate
      email
      firstName
      lastName
      data {
        gender
      }
    }
  }
}
    `;
export const useUpdateUserProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateUserProfileMutation, TError, UpdateUserProfileMutationVariables, TContext>
    ) =>
    useMutation<UpdateUserProfileMutation, TError, UpdateUserProfileMutationVariables, TContext>(
      ['UpdateUserProfile'],
      (variables?: UpdateUserProfileMutationVariables) => fetcher<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateUserProfileDocument, variables)(),
      options
    );
export const UnfollowSubjectDocument = `
    mutation UnfollowSubject($id: uuid!) {
  update_followers_by_pk(
    pk_columns: {id: $id}
    _set: {deleted_on: "now()", accepted_on: null}
  ) {
    id
  }
}
    `;
export const useUnfollowSubjectMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UnfollowSubjectMutation, TError, UnfollowSubjectMutationVariables, TContext>
    ) =>
    useMutation<UnfollowSubjectMutation, TError, UnfollowSubjectMutationVariables, TContext>(
      ['UnfollowSubject'],
      (variables?: UnfollowSubjectMutationVariables) => fetcher<UnfollowSubjectMutation, UnfollowSubjectMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UnfollowSubjectDocument, variables)(),
      options
    );
export const GetValuesParametersDocument = `
    query GetValuesParameters {
  values {
    id
    title
    title_alt
    ideal_max
    ideal_min
    abs_max
    abs_min
    status
  }
}
    `;
export const useGetValuesParametersQuery = <
      TData = GetValuesParametersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetValuesParametersQueryVariables,
      options?: UseQueryOptions<GetValuesParametersQuery, TError, TData>
    ) =>
    useQuery<GetValuesParametersQuery, TError, TData>(
      variables === undefined ? ['GetValuesParameters'] : ['GetValuesParameters', variables],
      fetcher<GetValuesParametersQuery, GetValuesParametersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetValuesParametersDocument, variables),
      options
    );
export const GetSpecificExplanationDocument = `
    query GetSpecificExplanation($age: GraphQLStringOrFloat!, $status: String, $gender: [String]) {
  match(
    filter: {max_age: {_gte: $age}, min_age: {_lte: $age}, gender: {_in: $gender}, status: {_eq: $status}}
  ) {
    refKey {
      id
    }
    max
    min
    max_age
    min_age
    gender
    status
    explanation {
      title
      explanation
    }
  }
}
    `;
export const useGetSpecificExplanationQuery = <
      TData = GetSpecificExplanationQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetSpecificExplanationQueryVariables,
      options?: UseQueryOptions<GetSpecificExplanationQuery, TError, TData>
    ) =>
    useQuery<GetSpecificExplanationQuery, TError, TData>(
      ['GetSpecificExplanation', variables],
      fetcher<GetSpecificExplanationQuery, GetSpecificExplanationQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetSpecificExplanationDocument, variables),
      options
    );
export const GetSpecificExplanationByKeyValueDocument = `
    query GetSpecificExplanationByKeyValue($age: GraphQLStringOrFloat!, $status: String = "published", $value: GraphQLStringOrFloat!, $refKey: String!, $gender: [String] = ["all"]) {
  match(
    filter: {max_age: {_gte: $age}, min_age: {_lte: $age}, gender: {_in: $gender}, status: {_eq: $status}, max: {_gte: $value}, min: {_lte: $value}, refKey: {id: {_eq: $refKey}}}
  ) {
    refKey {
      id
    }
    max
    min
    max_age
    min_age
    gender
    status
    explanation {
      title
      explanation
    }
  }
}
    `;
export const useGetSpecificExplanationByKeyValueQuery = <
      TData = GetSpecificExplanationByKeyValueQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetSpecificExplanationByKeyValueQueryVariables,
      options?: UseQueryOptions<GetSpecificExplanationByKeyValueQuery, TError, TData>
    ) =>
    useQuery<GetSpecificExplanationByKeyValueQuery, TError, TData>(
      ['GetSpecificExplanationByKeyValue', variables],
      fetcher<GetSpecificExplanationByKeyValueQuery, GetSpecificExplanationByKeyValueQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetSpecificExplanationByKeyValueDocument, variables),
      options
    );
export const GetSolutionsAndCategoryDocument = `
    query GetSolutionsAndCategory {
  Solution(
    filter: {status: {_eq: "published"}, category: {status: {_eq: "published"}}}
  ) {
    category {
      id
      name
    }
    id
    title
    tags
  }
}
    `;
export const useGetSolutionsAndCategoryQuery = <
      TData = GetSolutionsAndCategoryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetSolutionsAndCategoryQueryVariables,
      options?: UseQueryOptions<GetSolutionsAndCategoryQuery, TError, TData>
    ) =>
    useQuery<GetSolutionsAndCategoryQuery, TError, TData>(
      variables === undefined ? ['GetSolutionsAndCategory'] : ['GetSolutionsAndCategory', variables],
      fetcher<GetSolutionsAndCategoryQuery, GetSolutionsAndCategoryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetSolutionsAndCategoryDocument, variables),
      options
    );
export const GetSingleSolutionDocument = `
    query GetSingleSolution($id: ID!) {
  Solution_by_id(id: $id) {
    id
    tags
    title
    category {
      id
      name
    }
    content
  }
}
    `;
export const useGetSingleSolutionQuery = <
      TData = GetSingleSolutionQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetSingleSolutionQueryVariables,
      options?: UseQueryOptions<GetSingleSolutionQuery, TError, TData>
    ) =>
    useQuery<GetSingleSolutionQuery, TError, TData>(
      ['GetSingleSolution', variables],
      fetcher<GetSingleSolutionQuery, GetSingleSolutionQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetSingleSolutionDocument, variables),
      options
    );
export const GetBrainGaugeDetailsDocument = `
    query GetBrainGaugeDetails {
  bg_parameters {
    id
    key
    name
    explanation
  }
}
    `;
export const useGetBrainGaugeDetailsQuery = <
      TData = GetBrainGaugeDetailsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetBrainGaugeDetailsQueryVariables,
      options?: UseQueryOptions<GetBrainGaugeDetailsQuery, TError, TData>
    ) =>
    useQuery<GetBrainGaugeDetailsQuery, TError, TData>(
      variables === undefined ? ['GetBrainGaugeDetails'] : ['GetBrainGaugeDetails', variables],
      fetcher<GetBrainGaugeDetailsQuery, GetBrainGaugeDetailsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetBrainGaugeDetailsDocument, variables),
      options
    );
export const GetBrainGaugeRawScoresDocument = `
    query GetBrainGaugeRawScores {
  BG_Raw_Scores {
    id
    key
    name
    explanation
  }
}
    `;
export const useGetBrainGaugeRawScoresQuery = <
      TData = GetBrainGaugeRawScoresQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetBrainGaugeRawScoresQueryVariables,
      options?: UseQueryOptions<GetBrainGaugeRawScoresQuery, TError, TData>
    ) =>
    useQuery<GetBrainGaugeRawScoresQuery, TError, TData>(
      variables === undefined ? ['GetBrainGaugeRawScores'] : ['GetBrainGaugeRawScores', variables],
      fetcher<GetBrainGaugeRawScoresQuery, GetBrainGaugeRawScoresQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetBrainGaugeRawScoresDocument, variables),
      options
    );
export const DisclaimerQueryDocument = `
    query DisclaimerQuery($id: ID!, $disclaimerId: GraphQLStringOrFloat!, $userId: String!) {
  Disclaimer_Acknowledgement(
    filter: {UserId: {_eq: $userId}, Disclaimer: {id: {_eq: $disclaimerId}}}
  ) {
    id
    UserId
    Disclaimer {
      id
      Title
      Disclaimer
    }
  }
  Disclaimers_by_id(id: $id) {
    id
    Title
    Disclaimer
  }
}
    `;
export const useDisclaimerQueryQuery = <
      TData = DisclaimerQueryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: DisclaimerQueryQueryVariables,
      options?: UseQueryOptions<DisclaimerQueryQuery, TError, TData>
    ) =>
    useQuery<DisclaimerQueryQuery, TError, TData>(
      ['DisclaimerQuery', variables],
      fetcher<DisclaimerQueryQuery, DisclaimerQueryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DisclaimerQueryDocument, variables),
      options
    );
export const UpdateDisclaimerAgreementDocument = `
    mutation UpdateDisclaimerAgreement($date_updated: Date = "now()", $disclaimerAgreementId: ID!) {
  update_Disclaimer_Acknowledgement_item(
    data: {date_updated: $date_updated}
    id: $disclaimerAgreementId
  ) {
    UserId
    date_created
    date_updated
  }
}
    `;
export const useUpdateDisclaimerAgreementMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateDisclaimerAgreementMutation, TError, UpdateDisclaimerAgreementMutationVariables, TContext>
    ) =>
    useMutation<UpdateDisclaimerAgreementMutation, TError, UpdateDisclaimerAgreementMutationVariables, TContext>(
      ['UpdateDisclaimerAgreement'],
      (variables?: UpdateDisclaimerAgreementMutationVariables) => fetcher<UpdateDisclaimerAgreementMutation, UpdateDisclaimerAgreementMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateDisclaimerAgreementDocument, variables)(),
      options
    );
export const CreateDisclaimerAgreementDocument = `
    mutation CreateDisclaimerAgreement($disclaimerId: ID!, $UserId: String!) {
  create_Disclaimer_Acknowledgement_item(
    data: {Disclaimer: {id: $disclaimerId}, UserId: $UserId}
  ) {
    id
  }
}
    `;
export const useCreateDisclaimerAgreementMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateDisclaimerAgreementMutation, TError, CreateDisclaimerAgreementMutationVariables, TContext>
    ) =>
    useMutation<CreateDisclaimerAgreementMutation, TError, CreateDisclaimerAgreementMutationVariables, TContext>(
      ['CreateDisclaimerAgreement'],
      (variables?: CreateDisclaimerAgreementMutationVariables) => fetcher<CreateDisclaimerAgreementMutation, CreateDisclaimerAgreementMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateDisclaimerAgreementDocument, variables)(),
      options
    );
export const GetQuestionnairesDocument = `
    query GetQuestionnaires {
  questionnaire(filter: {status: {_eq: "published"}}, sort: "date_created") {
    id
    title
  }
}
    `;
export const useGetQuestionnairesQuery = <
      TData = GetQuestionnairesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetQuestionnairesQueryVariables,
      options?: UseQueryOptions<GetQuestionnairesQuery, TError, TData>
    ) =>
    useQuery<GetQuestionnairesQuery, TError, TData>(
      variables === undefined ? ['GetQuestionnaires'] : ['GetQuestionnaires', variables],
      fetcher<GetQuestionnairesQuery, GetQuestionnairesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetQuestionnairesDocument, variables),
      options
    );
export const GetQuestionSetsDocument = `
    query GetQuestionSets {
  question_set(filter: {status: {_eq: "published"}}, sort: "date_created") {
    id
    title
    questionnaires(filter: {questionnaire_id: {status: {_eq: "published"}}}) {
      questionnaire_id {
        id
        title
      }
    }
  }
}
    `;
export const useGetQuestionSetsQuery = <
      TData = GetQuestionSetsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetQuestionSetsQueryVariables,
      options?: UseQueryOptions<GetQuestionSetsQuery, TError, TData>
    ) =>
    useQuery<GetQuestionSetsQuery, TError, TData>(
      variables === undefined ? ['GetQuestionSets'] : ['GetQuestionSets', variables],
      fetcher<GetQuestionSetsQuery, GetQuestionSetsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetQuestionSetsDocument, variables),
      options
    );
export const GetQuestionSetByIdDocument = `
    query GetQuestionSetById($id: ID = "1") {
  question_set_by_id(id: $id) {
    id
    title
    instructions
    questions {
      id
      question
      instructions
      option_group {
        id
        options {
          id
          title
          value
        }
      }
    }
  }
}
    `;
export const useGetQuestionSetByIdQuery = <
      TData = GetQuestionSetByIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetQuestionSetByIdQueryVariables,
      options?: UseQueryOptions<GetQuestionSetByIdQuery, TError, TData>
    ) =>
    useQuery<GetQuestionSetByIdQuery, TError, TData>(
      variables === undefined ? ['GetQuestionSetById'] : ['GetQuestionSetById', variables],
      fetcher<GetQuestionSetByIdQuery, GetQuestionSetByIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetQuestionSetByIdDocument, variables),
      options
    );
export const CreateAnswersDocument = `
    mutation CreateAnswers($owner_id: String!, $question_set: ID!, $answers: [create_answer_input!]) {
  create_answer_set_item(
    data: {owner_id: $owner_id, question_set: {id: $question_set}, answers: $answers}
  ) {
    id
    answers {
      option {
        id
        title
        value
      }
      question {
        id
        question
      }
    }
  }
}
    `;
export const useCreateAnswersMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateAnswersMutation, TError, CreateAnswersMutationVariables, TContext>
    ) =>
    useMutation<CreateAnswersMutation, TError, CreateAnswersMutationVariables, TContext>(
      ['CreateAnswers'],
      (variables?: CreateAnswersMutationVariables) => fetcher<CreateAnswersMutation, CreateAnswersMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateAnswersDocument, variables)(),
      options
    );
export const GetAnswerSetAnswersForUserDocument = `
    query GetAnswerSetAnswersForUser($owner_id: ID!, $question_set_id: GraphQLStringOrFloat!, $question_set_id_ID: ID!) {
  question_set_by_id(id: $question_set_id_ID) {
    id
    title
    instructions
  }
  answer_set(
    filter: {owner_id: {_eq: $owner_id}, question_set: {id: {_eq: $question_set_id}}}
    sort: "-date_created"
  ) {
    id
    date_created
    answers {
      option {
        id
        title
        value
      }
    }
  }
}
    `;
export const useGetAnswerSetAnswersForUserQuery = <
      TData = GetAnswerSetAnswersForUserQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetAnswerSetAnswersForUserQueryVariables,
      options?: UseQueryOptions<GetAnswerSetAnswersForUserQuery, TError, TData>
    ) =>
    useQuery<GetAnswerSetAnswersForUserQuery, TError, TData>(
      ['GetAnswerSetAnswersForUser', variables],
      fetcher<GetAnswerSetAnswersForUserQuery, GetAnswerSetAnswersForUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAnswerSetAnswersForUserDocument, variables),
      options
    );
export const GetAnswerSetByIdDocument = `
    query GetAnswerSetById($id: ID!) {
  answer_set_by_id(id: $id) {
    id
    date_created
    question_set {
      title
      instructions
    }
    answers {
      option {
        id
        title
        value
      }
      question {
        id
        question
        instructions
        option_group {
          options {
            id
            title
            value
            option_group {
              options {
                id
                title
                sort
                value
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetAnswerSetByIdQuery = <
      TData = GetAnswerSetByIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetAnswerSetByIdQueryVariables,
      options?: UseQueryOptions<GetAnswerSetByIdQuery, TError, TData>
    ) =>
    useQuery<GetAnswerSetByIdQuery, TError, TData>(
      ['GetAnswerSetById', variables],
      fetcher<GetAnswerSetByIdQuery, GetAnswerSetByIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAnswerSetByIdDocument, variables),
      options
    );
export const GetQuestionnaireByIdDocument = `
    query GetQuestionnaireById($id: ID!) {
  questionnaire_by_id(id: $id) {
    id
    title
    question_sets {
      question_set_id {
        id
        title
        instructions
        questions {
          id
          instructions
          question
          option_group {
            id
            options {
              id
              title
              value
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetQuestionnaireByIdQuery = <
      TData = GetQuestionnaireByIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetQuestionnaireByIdQueryVariables,
      options?: UseQueryOptions<GetQuestionnaireByIdQuery, TError, TData>
    ) =>
    useQuery<GetQuestionnaireByIdQuery, TError, TData>(
      ['GetQuestionnaireById', variables],
      fetcher<GetQuestionnaireByIdQuery, GetQuestionnaireByIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetQuestionnaireByIdDocument, variables),
      options
    );
export const CreateAnswerGroupDocument = `
    mutation CreateAnswerGroup($owner_id: String!, $questionnaireId: ID!, $answerSets: [create_answer_set_input!]) {
  create_answer_group_item(
    data: {owner_id: $owner_id, questionnaire: {id: $questionnaireId}, answer_sets: $answerSets}
  ) {
    id
    owner_id
    questionnaire {
      id
      title
    }
    answer_sets {
      id
      answers {
        question {
          question
        }
        option {
          id
          title
          value
        }
      }
    }
  }
}
    `;
export const useCreateAnswerGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateAnswerGroupMutation, TError, CreateAnswerGroupMutationVariables, TContext>
    ) =>
    useMutation<CreateAnswerGroupMutation, TError, CreateAnswerGroupMutationVariables, TContext>(
      ['CreateAnswerGroup'],
      (variables?: CreateAnswerGroupMutationVariables) => fetcher<CreateAnswerGroupMutation, CreateAnswerGroupMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateAnswerGroupDocument, variables)(),
      options
    );
export const GetQuestionnaireAnswerSetSDocument = `
    query GetQuestionnaireAnswerSetS($owner_id: ID!, $questionnaireId: GraphQLStringOrFloat!) {
  answer_group(
    filter: {owner_id: {_eq: $owner_id}, questionnaire: {id: {_eq: $questionnaireId}}}
    sort: "-date_created"
  ) {
    id
    owner_id
    date_created
  }
}
    `;
export const useGetQuestionnaireAnswerSetSQuery = <
      TData = GetQuestionnaireAnswerSetSQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetQuestionnaireAnswerSetSQueryVariables,
      options?: UseQueryOptions<GetQuestionnaireAnswerSetSQuery, TError, TData>
    ) =>
    useQuery<GetQuestionnaireAnswerSetSQuery, TError, TData>(
      ['GetQuestionnaireAnswerSetS', variables],
      fetcher<GetQuestionnaireAnswerSetSQuery, GetQuestionnaireAnswerSetSQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetQuestionnaireAnswerSetSDocument, variables),
      options
    );
export const GetAnswerGroupByIdDocument = `
    query GetAnswerGroupById($id: ID!) {
  answer_group_by_id(id: $id) {
    answer_sets {
      id
      question_set {
        id
        key
        title
      }
      answers {
        question {
          id
          question
        }
        option {
          id
          title
          value
          option_group {
            options {
              id
              title
              value
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetAnswerGroupByIdQuery = <
      TData = GetAnswerGroupByIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetAnswerGroupByIdQueryVariables,
      options?: UseQueryOptions<GetAnswerGroupByIdQuery, TError, TData>
    ) =>
    useQuery<GetAnswerGroupByIdQuery, TError, TData>(
      ['GetAnswerGroupById', variables],
      fetcher<GetAnswerGroupByIdQuery, GetAnswerGroupByIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAnswerGroupByIdDocument, variables),
      options
    );
export const GetTutorialsDocument = `
    query GetTutorials {
  tutorials(filter: {status: {_eq: "published"}}) {
    id
    title
    type
    sort
  }
}
    `;
export const useGetTutorialsQuery = <
      TData = GetTutorialsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetTutorialsQueryVariables,
      options?: UseQueryOptions<GetTutorialsQuery, TError, TData>
    ) =>
    useQuery<GetTutorialsQuery, TError, TData>(
      variables === undefined ? ['GetTutorials'] : ['GetTutorials', variables],
      fetcher<GetTutorialsQuery, GetTutorialsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetTutorialsDocument, variables),
      options
    );
export const GetTutorialByIdDocument = `
    query GetTutorialById($id: ID!) {
  tutorials_by_id(id: $id) {
    id
    type
    title
    body
    date_created
    date_updated
  }
}
    `;
export const useGetTutorialByIdQuery = <
      TData = GetTutorialByIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetTutorialByIdQueryVariables,
      options?: UseQueryOptions<GetTutorialByIdQuery, TError, TData>
    ) =>
    useQuery<GetTutorialByIdQuery, TError, TData>(
      ['GetTutorialById', variables],
      fetcher<GetTutorialByIdQuery, GetTutorialByIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetTutorialByIdDocument, variables),
      options
    );
export const GetQuestionnaireConclusionsDocument = `
    query GetQuestionnaireConclusions($questionnaire_eq: GraphQLStringOrFloat!) {
  questionnaire_conclusion(
    filter: {questionnaire: {id: {_eq: $questionnaire_eq}}}
  ) {
    id
    title
    content
  }
}
    `;
export const useGetQuestionnaireConclusionsQuery = <
      TData = GetQuestionnaireConclusionsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetQuestionnaireConclusionsQueryVariables,
      options?: UseQueryOptions<GetQuestionnaireConclusionsQuery, TError, TData>
    ) =>
    useQuery<GetQuestionnaireConclusionsQuery, TError, TData>(
      ['GetQuestionnaireConclusions', variables],
      fetcher<GetQuestionnaireConclusionsQuery, GetQuestionnaireConclusionsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetQuestionnaireConclusionsDocument, variables),
      options
    );
export const InsertOneWholeBodyCompDocument = `
    mutation InsertOneWholeBodyComp($age: Int!, $ecw: numeric!, $gender: Int!, $height: Int!, $icw: numeric!, $owner: String!, $phase_angle: numeric!, $reactance: numeric!, $resistance: numeric!, $tbw: numeric!, $title: String!, $weight: Int!) {
  insert_whole_body_comp_one(
    object: {age: $age, ecw: $ecw, gender: $gender, height: $height, icw: $icw, owner: $owner, phase_angle: $phase_angle, reactance: $reactance, resistance: $resistance, tbw: $tbw, title: $title, weight: $weight}
  ) {
    id
    title
    age
    ecw
    gender
    height
    icw
    owner
    phase_angle
    reactance
    resistance
    tbw
    weight
  }
}
    `;
export const useInsertOneWholeBodyCompMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<InsertOneWholeBodyCompMutation, TError, InsertOneWholeBodyCompMutationVariables, TContext>
    ) =>
    useMutation<InsertOneWholeBodyCompMutation, TError, InsertOneWholeBodyCompMutationVariables, TContext>(
      ['InsertOneWholeBodyComp'],
      (variables?: InsertOneWholeBodyCompMutationVariables) => fetcher<InsertOneWholeBodyCompMutation, InsertOneWholeBodyCompMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, InsertOneWholeBodyCompDocument, variables)(),
      options
    );
export const GetWholeBodyCompByOwnerDocument = `
    query GetWholeBodyCompByOwner($owner: String!, $offset: Int = 0, $limit: Int = 100) {
  whole_body_comp(
    where: {owner: {_eq: $owner}}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    title
    owner
    reactance
    resistance
    gender
    ecw
    created_at
    age
    height
    icw
    phase_angle
    tbw
    updated_at
    weight
  }
}
    `;
export const useGetWholeBodyCompByOwnerQuery = <
      TData = GetWholeBodyCompByOwnerQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetWholeBodyCompByOwnerQueryVariables,
      options?: UseQueryOptions<GetWholeBodyCompByOwnerQuery, TError, TData>
    ) =>
    useQuery<GetWholeBodyCompByOwnerQuery, TError, TData>(
      ['GetWholeBodyCompByOwner', variables],
      fetcher<GetWholeBodyCompByOwnerQuery, GetWholeBodyCompByOwnerQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetWholeBodyCompByOwnerDocument, variables),
      options
    );
export const UpdateWholeBodyCompTitleDocument = `
    mutation UpdateWholeBodyCompTitle($id: uuid!, $title: String!) {
  update_whole_body_comp_by_pk(pk_columns: {id: $id}, _set: {title: $title}) {
    age
    created_at
    ecw
    gender
    height
    icw
    id
    owner
    phase_angle
    reactance
    resistance
    tbw
    title
    updated_at
    weight
  }
}
    `;
export const useUpdateWholeBodyCompTitleMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateWholeBodyCompTitleMutation, TError, UpdateWholeBodyCompTitleMutationVariables, TContext>
    ) =>
    useMutation<UpdateWholeBodyCompTitleMutation, TError, UpdateWholeBodyCompTitleMutationVariables, TContext>(
      ['UpdateWholeBodyCompTitle'],
      (variables?: UpdateWholeBodyCompTitleMutationVariables) => fetcher<UpdateWholeBodyCompTitleMutation, UpdateWholeBodyCompTitleMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateWholeBodyCompTitleDocument, variables)(),
      options
    );
export const DeleteWholeBodyCompTitleDocument = `
    mutation DeleteWholeBodyCompTitle($id: uuid!) {
  delete_whole_body_comp_by_pk(id: $id) {
    id
    title
  }
}
    `;
export const useDeleteWholeBodyCompTitleMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteWholeBodyCompTitleMutation, TError, DeleteWholeBodyCompTitleMutationVariables, TContext>
    ) =>
    useMutation<DeleteWholeBodyCompTitleMutation, TError, DeleteWholeBodyCompTitleMutationVariables, TContext>(
      ['DeleteWholeBodyCompTitle'],
      (variables?: DeleteWholeBodyCompTitleMutationVariables) => fetcher<DeleteWholeBodyCompTitleMutation, DeleteWholeBodyCompTitleMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteWholeBodyCompTitleDocument, variables)(),
      options
    );
export const GetSubjectDetailsDocument = `
    query GetSubjectDetails($id: uuid!, $_eq: String!) {
  user(id: $_eq) {
    firstName
    birthDate
    email
  }
  users_by_pk(id: $id) {
    data
    birth_date
    first_name
    last_name
    mobile_phone
  }
}
    `;
export const useGetSubjectDetailsQuery = <
      TData = GetSubjectDetailsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetSubjectDetailsQueryVariables,
      options?: UseQueryOptions<GetSubjectDetailsQuery, TError, TData>
    ) =>
    useQuery<GetSubjectDetailsQuery, TError, TData>(
      ['GetSubjectDetails', variables],
      fetcher<GetSubjectDetailsQuery, GetSubjectDetailsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetSubjectDetailsDocument, variables),
      options
    );
export const GetSubjectHeartDataRangeDocument = `
    query GetSubjectHeartDataRange($id: String!, $order_by: order_by, $start_date: timestamptz, $end_date: timestamptz) {
  heart_data(
    order_by: {created_on: $order_by}
    where: {owner: {_eq: $id}, deleted_on: {_is_null: true}, _and: [{created_on: {_gte: $start_date}}, {created_on: {_lte: $end_date}}]}
  ) {
    id
    title
    data
    created_on
    trend_recording
    rr_file {
      id
    }
    ecg_file {
      id
    }
    rr_metadata {
      id
      max
      mean
      min
      owner_id
      threshold
      total_filtered_rr
      total_rejected
      total_rr
    }
  }
}
    `;
export const useGetSubjectHeartDataRangeQuery = <
      TData = GetSubjectHeartDataRangeQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetSubjectHeartDataRangeQueryVariables,
      options?: UseQueryOptions<GetSubjectHeartDataRangeQuery, TError, TData>
    ) =>
    useQuery<GetSubjectHeartDataRangeQuery, TError, TData>(
      ['GetSubjectHeartDataRange', variables],
      fetcher<GetSubjectHeartDataRangeQuery, GetSubjectHeartDataRangeQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetSubjectHeartDataRangeDocument, variables),
      options
    );
export const GetUserFollowingDocument = `
    query GetUserFollowing($userId: String!) {
  all: followers_aggregate(
    where: {follower_id: {_eq: $userId}, deleted_on: {_is_null: true}}
  ) {
    aggregate {
      count
    }
  }
  accepted: followers_aggregate(
    where: {follower_id: {_eq: $userId}, accepted_on: {_is_null: false}}
  ) {
    aggregate {
      count
    }
  }
  pending: followers_aggregate(
    where: {follower_id: {_eq: $userId}, accepted_on: {_is_null: true}, deleted_on: {_is_null: true}}
  ) {
    aggregate {
      count
    }
  }
  followers(where: {follower_id: {_eq: $userId}, deleted_on: {_is_null: true}}) {
    accepted_on
    requested_on
    id
    followee_id
  }
}
    `;
export const useGetUserFollowingQuery = <
      TData = GetUserFollowingQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUserFollowingQueryVariables,
      options?: UseQueryOptions<GetUserFollowingQuery, TError, TData>
    ) =>
    useQuery<GetUserFollowingQuery, TError, TData>(
      ['GetUserFollowing', variables],
      fetcher<GetUserFollowingQuery, GetUserFollowingQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUserFollowingDocument, variables),
      options
    );
export const GetFollowingByPartiesIdDocument = `
    query GetFollowingByPartiesId($follower_id: String, $followee_id: String) {
  followers(
    where: {_and: [{follower_id: {_eq: $follower_id}}, {followee_id: {_eq: $followee_id}}]}
  ) {
    id
    follower_id
    followee_id
    accepted_on
    deleted_on
    requested_on
  }
}
    `;
export const useGetFollowingByPartiesIdQuery = <
      TData = GetFollowingByPartiesIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetFollowingByPartiesIdQueryVariables,
      options?: UseQueryOptions<GetFollowingByPartiesIdQuery, TError, TData>
    ) =>
    useQuery<GetFollowingByPartiesIdQuery, TError, TData>(
      variables === undefined ? ['GetFollowingByPartiesId'] : ['GetFollowingByPartiesId', variables],
      fetcher<GetFollowingByPartiesIdQuery, GetFollowingByPartiesIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetFollowingByPartiesIdDocument, variables),
      options
    );
export const CompletelyRemoveFollowDocument = `
    mutation completelyRemoveFollow($id: uuid!) {
  delete_followers_by_pk(id: $id) {
    id
  }
}
    `;
export const useCompletelyRemoveFollowMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CompletelyRemoveFollowMutation, TError, CompletelyRemoveFollowMutationVariables, TContext>
    ) =>
    useMutation<CompletelyRemoveFollowMutation, TError, CompletelyRemoveFollowMutationVariables, TContext>(
      ['completelyRemoveFollow'],
      (variables?: CompletelyRemoveFollowMutationVariables) => fetcher<CompletelyRemoveFollowMutation, CompletelyRemoveFollowMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CompletelyRemoveFollowDocument, variables)(),
      options
    );
export const AcceptFollowingDocument = `
    mutation AcceptFollowing($id: uuid!) {
  update_followers_by_pk(
    pk_columns: {id: $id}
    _set: {accepted_on: "now()", deleted_on: null}
  ) {
    id
    accepted_on
  }
}
    `;
export const useAcceptFollowingMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AcceptFollowingMutation, TError, AcceptFollowingMutationVariables, TContext>
    ) =>
    useMutation<AcceptFollowingMutation, TError, AcceptFollowingMutationVariables, TContext>(
      ['AcceptFollowing'],
      (variables?: AcceptFollowingMutationVariables) => fetcher<AcceptFollowingMutation, AcceptFollowingMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AcceptFollowingDocument, variables)(),
      options
    );
export const UpsertUserMetaDataDocument = `
    mutation UpsertUserMetaData($id: uuid!, $metadata: jsonb!) {
  insert_user_metadata_one(
    object: {id: $id, metadata: $metadata}
    on_conflict: {constraint: user_metadata_pkey, update_columns: metadata}
  ) {
    id
    metadata
    created_at
    updated_at
  }
}
    `;
export const useUpsertUserMetaDataMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpsertUserMetaDataMutation, TError, UpsertUserMetaDataMutationVariables, TContext>
    ) =>
    useMutation<UpsertUserMetaDataMutation, TError, UpsertUserMetaDataMutationVariables, TContext>(
      ['UpsertUserMetaData'],
      (variables?: UpsertUserMetaDataMutationVariables) => fetcher<UpsertUserMetaDataMutation, UpsertUserMetaDataMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpsertUserMetaDataDocument, variables)(),
      options
    );
export const GetUserMetaDataDocument = `
    query GetUserMetaData($id: uuid!) {
  user_metadata_by_pk(id: $id) {
    id
    metadata
    created_at
    updated_at
  }
}
    `;
export const useGetUserMetaDataQuery = <
      TData = GetUserMetaDataQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUserMetaDataQueryVariables,
      options?: UseQueryOptions<GetUserMetaDataQuery, TError, TData>
    ) =>
    useQuery<GetUserMetaDataQuery, TError, TData>(
      ['GetUserMetaData', variables],
      fetcher<GetUserMetaDataQuery, GetUserMetaDataQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUserMetaDataDocument, variables),
      options
    );
export const GetAdrenalTestsByOwnerDocument = `
    query GetAdrenalTestsByOwner($owner_id: String!, $created_at: order_by = desc) {
  adrenal_function_urine_test(
    where: {owner_id: {_eq: $owner_id}, deleted_at: {_is_null: true}}
    order_by: {created_at: $created_at}
  ) {
    id
    title
    drops
    created_at
    updated_at
    owner_id
  }
}
    `;
export const useGetAdrenalTestsByOwnerQuery = <
      TData = GetAdrenalTestsByOwnerQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetAdrenalTestsByOwnerQueryVariables,
      options?: UseQueryOptions<GetAdrenalTestsByOwnerQuery, TError, TData>
    ) =>
    useQuery<GetAdrenalTestsByOwnerQuery, TError, TData>(
      ['GetAdrenalTestsByOwner', variables],
      fetcher<GetAdrenalTestsByOwnerQuery, GetAdrenalTestsByOwnerQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAdrenalTestsByOwnerDocument, variables),
      options
    );
export const DeleteAdrenalTestByIdDocument = `
    mutation DeleteAdrenalTestById($id: uuid!) {
  update_adrenal_function_urine_test_by_pk(
    pk_columns: {id: $id}
    _set: {deleted_at: "now()"}
  ) {
    id
  }
}
    `;
export const useDeleteAdrenalTestByIdMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteAdrenalTestByIdMutation, TError, DeleteAdrenalTestByIdMutationVariables, TContext>
    ) =>
    useMutation<DeleteAdrenalTestByIdMutation, TError, DeleteAdrenalTestByIdMutationVariables, TContext>(
      ['DeleteAdrenalTestById'],
      (variables?: DeleteAdrenalTestByIdMutationVariables) => fetcher<DeleteAdrenalTestByIdMutation, DeleteAdrenalTestByIdMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteAdrenalTestByIdDocument, variables)(),
      options
    );
export const InsertAdrenalTestDocument = `
    mutation InsertAdrenalTest($owner_id: String!, $title: String!, $drops: Int!, $created_at: timestamptz = "now()") {
  insert_adrenal_function_urine_test_one(
    object: {owner_id: $owner_id, title: $title, drops: $drops, created_at: $created_at}
  ) {
    id
    drops
    owner_id
    title
    created_at
    updated_at
  }
}
    `;
export const useInsertAdrenalTestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<InsertAdrenalTestMutation, TError, InsertAdrenalTestMutationVariables, TContext>
    ) =>
    useMutation<InsertAdrenalTestMutation, TError, InsertAdrenalTestMutationVariables, TContext>(
      ['InsertAdrenalTest'],
      (variables?: InsertAdrenalTestMutationVariables) => fetcher<InsertAdrenalTestMutation, InsertAdrenalTestMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, InsertAdrenalTestDocument, variables)(),
      options
    );
export const UpdateAdrenalTestDocument = `
    mutation UpdateAdrenalTest($id: uuid!, $_set: adrenal_function_urine_test_set_input = {}) {
  update_adrenal_function_urine_test_by_pk(pk_columns: {id: $id}, _set: $_set) {
    id
    owner_id
    title
    drops
    deleted_at
    created_at
    updated_at
  }
}
    `;
export const useUpdateAdrenalTestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateAdrenalTestMutation, TError, UpdateAdrenalTestMutationVariables, TContext>
    ) =>
    useMutation<UpdateAdrenalTestMutation, TError, UpdateAdrenalTestMutationVariables, TContext>(
      ['UpdateAdrenalTest'],
      (variables?: UpdateAdrenalTestMutationVariables) => fetcher<UpdateAdrenalTestMutation, UpdateAdrenalTestMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateAdrenalTestDocument, variables)(),
      options
    );
export const GetOxidativeStressTestsByOwnerDocument = `
    query GetOxidativeStressTestsByOwner($owner_id: String!) {
  oxidative_stress_test(
    where: {owner_id: {_eq: $owner_id}, deleted_at: {_is_null: true}}
    order_by: {created_at: desc}
  ) {
    id
    owner_id
    title
    created_at
    updated_at
    deleted_at
    color
  }
}
    `;
export const useGetOxidativeStressTestsByOwnerQuery = <
      TData = GetOxidativeStressTestsByOwnerQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetOxidativeStressTestsByOwnerQueryVariables,
      options?: UseQueryOptions<GetOxidativeStressTestsByOwnerQuery, TError, TData>
    ) =>
    useQuery<GetOxidativeStressTestsByOwnerQuery, TError, TData>(
      ['GetOxidativeStressTestsByOwner', variables],
      fetcher<GetOxidativeStressTestsByOwnerQuery, GetOxidativeStressTestsByOwnerQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetOxidativeStressTestsByOwnerDocument, variables),
      options
    );
export const InsertOxidativeStressTestDocument = `
    mutation InsertOxidativeStressTest($owner_id: String!, $title: String = "Test", $created_at: timestamptz = "now()", $color: Int!) {
  insert_oxidative_stress_test_one(
    object: {owner_id: $owner_id, title: $title, created_at: $created_at, color: $color}
  ) {
    id
    owner_id
    title
    created_at
    updated_at
    deleted_at
    color
  }
}
    `;
export const useInsertOxidativeStressTestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<InsertOxidativeStressTestMutation, TError, InsertOxidativeStressTestMutationVariables, TContext>
    ) =>
    useMutation<InsertOxidativeStressTestMutation, TError, InsertOxidativeStressTestMutationVariables, TContext>(
      ['InsertOxidativeStressTest'],
      (variables?: InsertOxidativeStressTestMutationVariables) => fetcher<InsertOxidativeStressTestMutation, InsertOxidativeStressTestMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, InsertOxidativeStressTestDocument, variables)(),
      options
    );
export const UpdateOxidativeStressTestDocument = `
    mutation UpdateOxidativeStressTest($id: uuid!, $_set: oxidative_stress_test_set_input = {}) {
  update_oxidative_stress_test_by_pk(pk_columns: {id: $id}, _set: $_set) {
    id
    owner_id
    title
    created_at
    updated_at
    deleted_at
    color
  }
}
    `;
export const useUpdateOxidativeStressTestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateOxidativeStressTestMutation, TError, UpdateOxidativeStressTestMutationVariables, TContext>
    ) =>
    useMutation<UpdateOxidativeStressTestMutation, TError, UpdateOxidativeStressTestMutationVariables, TContext>(
      ['UpdateOxidativeStressTest'],
      (variables?: UpdateOxidativeStressTestMutationVariables) => fetcher<UpdateOxidativeStressTestMutation, UpdateOxidativeStressTestMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateOxidativeStressTestDocument, variables)(),
      options
    );
export const DeleteOxidativeStressTestDocument = `
    mutation DeleteOxidativeStressTest($id: uuid!) {
  update_oxidative_stress_test_by_pk(
    pk_columns: {id: $id}
    _set: {deleted_at: "now()"}
  ) {
    id
    owner_id
    title
    created_at
    updated_at
    deleted_at
    color
  }
}
    `;
export const useDeleteOxidativeStressTestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteOxidativeStressTestMutation, TError, DeleteOxidativeStressTestMutationVariables, TContext>
    ) =>
    useMutation<DeleteOxidativeStressTestMutation, TError, DeleteOxidativeStressTestMutationVariables, TContext>(
      ['DeleteOxidativeStressTest'],
      (variables?: DeleteOxidativeStressTestMutationVariables) => fetcher<DeleteOxidativeStressTestMutation, DeleteOxidativeStressTestMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteOxidativeStressTestDocument, variables)(),
      options
    );