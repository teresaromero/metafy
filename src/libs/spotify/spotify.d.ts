export interface PublicUserObject {
  id: String
  //The Spotify user ID for the user.	String
  display_name: String | null
  // The name displayed on the user’s profile. null if not available.	String
  followers: FollowersObject
  // Information about the followers of this user.	FollowersObject
  href: String
  // A link to the Web API endpoint for this user.	String
  external_urls: ExternalUrlObject
  // Known public external URLs for this user.	ExternalUrlObject
  images: ImageObject[]
  //The user’s profile image.	Array[ImageObject]
  uri: String
  //The Spotify URI for the user.	String
  type: String
  //The object type: “user”	String
}

export interface PrivateUserObject extends PublicUserObject {
  country: String | undefined
  //The country of the user, as set in the user’s account profile. An ISO 3166-1 alpha-2 country code. This field is only available when the current user has granted access to the user-read-private scope.	String
  email: String | undefined
  //The user’s email address, as entered by the user when creating their account. Important! This email address is unverified; there is no proof that it actually belongs to the user. This field is only available when the current user has granted access to the user-read-email scope.	String
  explicit_content: ExplicitContentSettingsObject
  //The user’s explicit content settings. This field is only available when the current user has granted access to the user-read-private scope.
  product: String
  //The user’s Spotify subscription level: “premium”, “free”, etc. (The subscription level “open” can be considered the same as “free”.) This field is only available when the current user has granted access to the user-read-private scope.	String
}

interface ExplicitContentSettingsObject {
  filter_enabled: Boolean
  // When true, indicates that explicit content should not be played.
  filter_locked: Boolean
  // When true, indicates that the explicit content setting is locked and can’t be changed by the user.
}

interface ExternalUrlObject {
  spotify: String
  // The Spotify URL for the object.
}

interface FollowersObject {
  href: String | null
  // A link to the Web API endpoint providing full details of the followers; null if not available. Please note that this will always be set to null, as the Web API does not support it at the moment.	String
  total: Number
  //The total number of followers.
}

interface ImageObject {
  height: Number | null
  // The image height in pixels. If unknown: null or not returned.	Integer
  url: String
  // The source URL of the image.String
  width: Number
  // The image width in pixels.If unknown: null or not returned.
}

interface AuthErrorResponse {
  error: string
  error_description: string
}

interface RegularErrorResponse {
  error: {
    status: number
    message: string
  }
}
