export interface SearchResponse {
  artists: PagingObject<ArtistObject>
  album: PagingObject<SimplifiedAlbumObject>
  track: PagingObject<TrackObject>
  show: PagingObject<SimplifiedShowObject>
  episode: PagingObject<SimplifiedEpisodeObject>
}

interface ResumePointObject {
  fully_played: boolean
  resume_position_ms: number
}

interface SimplifiedShowObject {
  available_markets: string[]
  copyrights: CopyrightObject[]
  description: string
  explicit: boolean
  external_urls: ExternalUrlObject
  href: string
  id: string
  images: ImageObject[]
  is_externally_hosted: boolean
  languages: string[]
  media_type: string
  name: string
  publisher: string
  type: 'show'
  uri: string
}

interface SimplifiedEpisodeObject {
  audio_preview_url: string
  description: string
  duration_ms: string
  explicit: boolean
  external_urls: ExternalUrlObject
  href: string
  id: string
  images: ImageObject[]
  is_externally_hosted: boolean
  is_playable: boolean
  language?: string
  languages: string[]
  name: string
  realease_date: string
  release_date_precision: 'year' | 'month' | 'day'
  resume_point?: ResumePointObject
  type: 'episode'
  uri: string
}

interface RestrictionObject {
  reason: 'market' | 'product' | 'explicit'
}

interface TrackObject {
  album: SimplifiedAlbumObject
  artists: ArtistObject[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIdObject
  external_urls: ExternalUrlObject
  href: string
  id: string
  is_local: boolean
  is_playable: boolean
  linked_from: LinkedTrackObject
  name: string
  popularity: number
  preview_url: string
  restrictions: RestrictionObject
  track_number: number
  type: 'track'
  uri: string
}

interface PagingObject<T> {
  href: string
  items: T[]
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
}

interface BaseObject {
  genres: string[]
  external_urls: ExternalUrlObject
  popularity: number
  uri: string
  name: string
  href: string
  id: string
  images: ImageObject[]
}

export interface SimplifiedArtistObject
  extends Omit<BaseObject, 'images|genres|popularity'> {
  type: 'artist'
}

export interface ArtistObject extends BaseObject {
  followers: FollowersObject
  type: 'artist'
}

export interface CopyrightObject {
  text: string
  type: 'C' | 'P'
}

export interface ExternalIdObject {
  ean: string
  isrc: string
  upc: string
}

export interface SimplifiedAlbumObject
  extends Omit<BaseObject, 'genres|popularity'> {
  album_group: 'album' | 'single' | 'compilation' | 'appears_on'
  album_type: 'album' | 'single' | 'compilation'
  artists: ArtistObject[]
  available_markets: string[]
  release_date: string
  release_date_precision: 'year' | 'month' | 'day'
  restrictions: RestrictionObject
  type: 'album'
}

export interface AlbumObject extends BaseObject {
  album_type: 'album' | 'single' | 'compilation'
  artists: ArtistObject[]
  available_markets: string[]
  copyrights: CopyrightObject[]
  external_ids: ExternalIdObject
  label: string
  release_date: string
  release_date_precision: 'year' | 'month' | 'day'
  restrictions: RestrictionObject
  tracks: SimplifiedTrackObject[]
  type: 'album'
}

export interface LinkedTrackObject
  extends Omit<BaseObject, 'images|genres|popularity|name'> {
  type: 'track'
}

export interface SimplifiedTrackObject
  extends Omit<BaseObject, 'images|genres|popularity'> {
  artists: SimplifiedArtistObject[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  is_local: boolean
  is_playable: boolean
  linked_from: LinkedTrackObject
  preview_url: string
  restrictions: string
  track_number: number
  type: 'track'
}

export interface PublicUserObject {
  id: string
  //The Spotify user ID for the user.	String
  display_name: string | null
  // The name displayed on the user’s profile. null if not available.	String
  followers: FollowersObject
  // Information about the followers of this user.	FollowersObject
  href: string
  // A link to the Web API endpoint for this user.	String
  external_urls: ExternalUrlObject
  // Known public external URLs for this user.	ExternalUrlObject
  images: ImageObject[]
  //The user’s profile image.	Array[ImageObject]
  uri: string
  //The Spotify URI for the user.	String
  type: string
  //The object type: “user”	String
}

export interface PrivateUserObject extends PublicUserObject {
  country: string | undefined
  //The country of the user, as set in the user’s account profile. An ISO 3166-1 alpha-2 country code. This field is only available when the current user has granted access to the user-read-private scope.	String
  email: string | undefined
  //The user’s email address, as entered by the user when creating their account. Important! This email address is unverified; there is no proof that it actually belongs to the user. This field is only available when the current user has granted access to the user-read-email scope.	String
  explicit_content: ExplicitContentSettingsObject
  //The user’s explicit content settings. This field is only available when the current user has granted access to the user-read-private scope.
  product: string
  //The user’s Spotify subscription level: “premium”, “free”, etc. (The subscription level “open” can be considered the same as “free”.) This field is only available when the current user has granted access to the user-read-private scope.	String
}

interface ExplicitContentSettingsObject {
  filter_enabled: boolean
  // When true, indicates that explicit content should not be played.
  filter_locked: boolean
  // When true, indicates that the explicit content setting is locked and can’t be changed by the user.
}

interface ExternalUrlObject {
  spotify: string
  // The Spotify URL for the object.
}

interface FollowersObject {
  href: string | null
  // A link to the Web API endpoint providing full details of the followers; null if not available. Please note that this will always be set to null, as the Web API does not support it at the moment.	String
  total: number
  //The total number of followers.
}

interface ImageObject {
  height: number | null
  // The image height in pixels. If unknown: null or not returned.	Integer
  url: string
  // The source URL of the image.String
  width: number
  // The image width in pixels.If unknown: null or not returned.
}

interface AuthErrorResponse {
  error: string
  error_description: string
}

export interface RegularErrorResponse {
  error: {
    status: number
    message: string
  }
}

export interface SearchQuery {
  q: string
  type: string
  market?: string
  limit?: number
  // default 20 - min 1 - max 50
  offset?: number
  // default 0 - max 1000
  include_external?: ExternalType
}

export interface NewReleasesQuery {
  country?: string
  limit?: number
  // default 20 - min 1 - max 50
  offset?: number
  // default 0 - max 1000
}

export interface NewReleasesResponse {
  albums: PagingObject<AlbumObject>
}
