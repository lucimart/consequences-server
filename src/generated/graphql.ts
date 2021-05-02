import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type Group = {
  __typename?: 'Group';
  id: Scalars['ID'];
  name: Scalars['String'];
  private: Scalars['Boolean'];
  members: Array<Member>;
  posts: Array<Post>;
  owner: User;
};

export type GroupInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  private?: Maybe<Scalars['Boolean']>;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['ID'];
  post: Post;
  imageUrl: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  user: User;
  group: Group;
  write: Scalars['Boolean'];
  isModerator: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createText: Text;
  deleteText?: Maybe<Text>;
  signup?: Maybe<AuthPayload>;
  login?: Maybe<AuthPayload>;
  createGroup: Group;
  createVote: Vote;
};


export type MutationCreateTextArgs = {
  body: Scalars['String'];
  groupId?: Maybe<Scalars['ID']>;
  parentId?: Maybe<Scalars['ID']>;
};


export type MutationDeleteTextArgs = {
  id: Scalars['ID'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  name: Scalars['String'];
};


export type MutationCreateVoteArgs = {
  postId?: Maybe<Scalars['ID']>;
  replyId?: Maybe<Scalars['ID']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  author: User;
  group: Group;
  text?: Maybe<Text>;
  image?: Maybe<Image>;
  votes: Array<Vote>;
  votesCount: Scalars['Int'];
  replies: Array<Reply>;
  parent?: Maybe<Post>;
  children: Array<Post>;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  info: Scalars['String'];
  feed: Array<Post>;
  text?: Maybe<Text>;
};


export type QueryFeedArgs = {
  groupId?: Maybe<Scalars['ID']>;
  parentId?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryTextArgs = {
  id: Scalars['ID'];
};

export type Reply = {
  __typename?: 'Reply';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  body: Scalars['String'];
  author: User;
  post?: Maybe<Post>;
  votes: Array<Vote>;
  parent?: Maybe<Reply>;
  children: Array<Reply>;
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export type Text = {
  __typename?: 'Text';
  id: Scalars['ID'];
  post: Post;
  body: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  posts: Array<Post>;
  profile: Profile;
  role: Role;
  ownerOf: Array<Group>;
  memberOf: Array<Member>;
  votes: Array<Vote>;
  replies: Array<Reply>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  post?: Maybe<Post>;
  reply?: Maybe<Reply>;
  user: User;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CacheControlScope: CacheControlScope;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Group: ResolverTypeWrapper<Group>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  GroupInput: GroupInput;
  Image: ResolverTypeWrapper<Image>;
  Member: ResolverTypeWrapper<Member>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  Reply: ResolverTypeWrapper<Reply>;
  Role: Role;
  Text: ResolverTypeWrapper<Text>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  Vote: ResolverTypeWrapper<Vote>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: AuthPayload;
  String: Scalars['String'];
  DateTime: Scalars['DateTime'];
  Group: Group;
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  GroupInput: GroupInput;
  Image: Image;
  Member: Member;
  Mutation: {};
  Post: Post;
  Int: Scalars['Int'];
  Profile: Profile;
  Query: {};
  Reply: Reply;
  Text: Text;
  Upload: Scalars['Upload'];
  User: User;
  Vote: Vote;
}>;

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = Context, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GroupResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['Member']>, ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  write?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isModerator?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createText?: Resolver<ResolversTypes['Text'], ParentType, ContextType, RequireFields<MutationCreateTextArgs, 'body'>>;
  deleteText?: Resolver<Maybe<ResolversTypes['Text']>, ParentType, ContextType, RequireFields<MutationDeleteTextArgs, 'id'>>;
  signup?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'password' | 'name'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  createGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationCreateGroupArgs, 'name'>>;
  createVote?: Resolver<ResolversTypes['Vote'], ParentType, ContextType, RequireFields<MutationCreateVoteArgs, never>>;
}>;

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['Text']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType>;
  votesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  replies?: Resolver<Array<ResolversTypes['Reply']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  children?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  info?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feed?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryFeedArgs, never>>;
  text?: Resolver<Maybe<ResolversTypes['Text']>, ParentType, ContextType, RequireFields<QueryTextArgs, 'id'>>;
}>;

export type ReplyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Reply'] = ResolversParentTypes['Reply']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Reply']>, ParentType, ContextType>;
  children?: Resolver<Array<ResolversTypes['Reply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TextResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Text'] = ResolversParentTypes['Text']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  ownerOf?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  memberOf?: Resolver<Array<ResolversTypes['Member']>, ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType>;
  replies?: Resolver<Array<ResolversTypes['Reply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoteResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  reply?: Resolver<Maybe<ResolversTypes['Reply']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Group?: GroupResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Member?: MemberResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reply?: ReplyResolvers<ContextType>;
  Text?: TextResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
}>;


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<ContextType>;