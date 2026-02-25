import schemata from '../schemata'

type IsAny<T> = 0 extends 1 & T ? true : false
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (
  <T>() => T extends B ? 1 : 2
)
  ? true
  : false
type Expect<T extends true> = T
type ExpectFalse<T extends false> = T

const profileSchema = schemata({
  name: 'Profile',
  properties: {
    nickname: { type: String, defaultValue: 'blue' },
    visits: { type: Number, defaultValue: 0 },
    verified: { type: Boolean, defaultValue: false },
    joinedAt: { type: Date }
  }
})

const commentSchema = schemata({
  name: 'Comment',
  properties: {
    body: { type: String, defaultValue: 'first' },
    upvotes: { type: Number, defaultValue: 0 }
  }
})

const numberBoxSchema = schemata({
  name: 'NumberBox',
  properties: {
    value: { type: Number, defaultValue: 0 }
  }
})

const auditSchema = schemata({
  name: 'Audit',
  properties: {
    createdBy: { type: String, defaultValue: 'system' },
    reviewedAt: { type: Date }
  }
})

const baseSchema = schemata({
  name: 'Base',
  properties: {
    name: { type: String, defaultValue: 'blue' },
    profile: { type: profileSchema },
    comments: { type: schemata.Array(commentSchema) }
  }
})

const flagsSchema = schemata({
  name: 'Flags',
  properties: {
    isHungry: { type: Boolean, defaultValue: true },
    favoriteNumbers: { type: schemata.Array(numberBoxSchema) }
  }
})

const metadataSchema = schemata({
  name: 'Metadata',
  properties: {
    audit: { type: auditSchema }
  }
})

const extendedSchema = baseSchema.extend(flagsSchema).extend(metadataSchema)

const defaultItem = extendedSchema.makeDefault()
const blankItem = extendedSchema.makeBlank()
const castItem = extendedSchema.cast({
  name: 123,
  profile: { nickname: 456, visits: '5', verified: 1, joinedAt: new Date() },
  comments: [{ body: 10, upvotes: '2' }],
  isHungry: '1',
  favoriteNumbers: [{ value: '3' }],
  audit: { createdBy: 999, reviewedAt: new Date().toISOString() }
})
const strippedItem = extendedSchema.stripUnknownProperties({
  name: 'Jess',
  profile: { nickname: 'J', extra: 'remove me' },
  comments: [{ body: 'hello', extra: 'remove me too' }],
  isHungry: true,
  favoriteNumbers: [{ value: 10, extra: 'nope' }],
  audit: { createdBy: 'system', extra: 'remove this' },
  extra: 'remove root extra'
})

type _defaultNotAny = ExpectFalse<IsAny<typeof defaultItem>>
type _blankNotAny = ExpectFalse<IsAny<typeof blankItem>>
type _castNotAny = ExpectFalse<IsAny<typeof castItem>>
type _strippedNotAny = ExpectFalse<IsAny<typeof strippedItem>>
type _profileNotAny = ExpectFalse<IsAny<typeof defaultItem.profile>>
type _commentsNotAny = ExpectFalse<IsAny<typeof defaultItem.comments>>

type _blankMatchesDefault = Expect<Equal<typeof blankItem, typeof defaultItem>>
type _castMatchesDefault = Expect<Equal<typeof castItem, typeof defaultItem>>
type _strippedMatchesDefault = Expect<
  Equal<typeof strippedItem, typeof defaultItem>
>

type _defaultHasName = Expect<'name' extends keyof typeof defaultItem ? true : false>
type _defaultHasProfile = Expect<
  'profile' extends keyof typeof defaultItem ? true : false
>
type _defaultHasComments = Expect<
  'comments' extends keyof typeof defaultItem ? true : false
>
type _defaultHasHungry = Expect<
  'isHungry' extends keyof typeof defaultItem ? true : false
>
type _defaultHasFavoriteNumbers = Expect<
  'favoriteNumbers' extends keyof typeof defaultItem ? true : false
>
type _defaultHasAudit = Expect<'audit' extends keyof typeof defaultItem ? true : false>

type ProfileItem = NonNullable<typeof defaultItem.profile>
type CommentItem = NonNullable<typeof defaultItem.comments>[number]
type AuditItem = NonNullable<typeof defaultItem.audit>

type _profileHasNickname = Expect<'nickname' extends keyof ProfileItem ? true : false>
type _profileHasVisits = Expect<'visits' extends keyof ProfileItem ? true : false>
type _commentHasBody = Expect<'body' extends keyof CommentItem ? true : false>
type _commentHasUpvotes = Expect<'upvotes' extends keyof CommentItem ? true : false>
type _auditHasCreatedBy = Expect<'createdBy' extends keyof AuditItem ? true : false>
type _auditHasReviewedAt = Expect<'reviewedAt' extends keyof AuditItem ? true : false>

const extensionA = schemata({
  name: 'A',
  properties: {
    name: { type: String, defaultValue: 'blue' }
  }
})

const extensionB = schemata({
  name: 'B',
  properties: {
    isHungry: { type: Boolean, defaultValue: true }
  }
})

const extensionC = schemata({
  name: 'C',
  properties: {
    score: { type: Number, defaultValue: 1 }
  }
})

const chainedSchema = extensionA.extend(extensionB).extend(extensionC)
const chainedItem = chainedSchema.makeDefault()

type _chainedNotAny = ExpectFalse<IsAny<typeof chainedItem>>
type _chainedHasName = Expect<'name' extends keyof typeof chainedItem ? true : false>
type _chainedHasHungry = Expect<
  'isHungry' extends keyof typeof chainedItem ? true : false
>
type _chainedHasScore = Expect<
  'score' extends keyof typeof chainedItem ? true : false
>

const mergedAgain = extensionA.extend(extensionB).extend(extensionA)
const mergedItem = mergedAgain.makeDefault()

type _mergedNotAny = ExpectFalse<IsAny<typeof mergedItem>>
type _mergedHasName = Expect<'name' extends keyof typeof mergedItem ? true : false>
type _mergedHasHungry = Expect<
  'isHungry' extends keyof typeof mergedItem ? true : false
>

// @ts-expect-error missingProperty should not exist on inferred schema type
chainedItem.missingProperty

// @ts-expect-error name is inferred from schema and should not accept number assignment
const invalidName: number = chainedItem.name

// @ts-expect-error madeUpField should not exist on nested schema type
defaultItem.profile?.madeUpField

// Prevent TS from erasing value usage in this file
void [
  defaultItem,
  blankItem,
  castItem,
  strippedItem,
  chainedItem,
  mergedItem,
  invalidName
]
