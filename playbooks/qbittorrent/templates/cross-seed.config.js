/** @format */

"use strict";
// If you find yourself always using the same command-line flag, you can set
// it here as a default.
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
  /**
   * Pause at least this much in between each search. Higher is safer.
   * It is not recommended to set this to less than 15 seconds.
   */
  delay: 30,
  /**
   * List of Torznab URLs.
   * For Jackett, click "Copy RSS feed"
   * For Prowlarr, click on the indexer name and copy the Torznab Url, then append "?apikey=YOUR_PROWLARR_API_KEY"
   * Wrap each URL in quotation marks, and separate them with commas, and surround the entire set in brackets.
   */
  torznab: [
    "https://{{ cross_seed_prowlarr_hostname }}/1/api?apikey={{ cross_seed_prowlarr_api_key }}",  // AvistaZ
    "https://{{ cross_seed_prowlarr_hostname }}/2/api?apikey={{ cross_seed_prowlarr_api_key }}",  // CinemaZ
    "https://{{ cross_seed_prowlarr_hostname }}/4/api?apikey={{ cross_seed_prowlarr_api_key }}",  // Oldtoons
    "https://{{ cross_seed_prowlarr_hostname }}/5/api?apikey={{ cross_seed_prowlarr_api_key }}",  // Upload.cx
    "https://{{ cross_seed_prowlarr_hostname }}/6/api?apikey={{ cross_seed_prowlarr_api_key }}",  // JPTV
    "https://{{ cross_seed_prowlarr_hostname }}/7/api?apikey={{ cross_seed_prowlarr_api_key }}",  // LST
    "https://{{ cross_seed_prowlarr_hostname }}/9/api?apikey={{ cross_seed_prowlarr_api_key }}",  // DigitalCore
    "https://{{ cross_seed_prowlarr_hostname }}/10/api?apikey={{ cross_seed_prowlarr_api_key }}", // Aither
  ],
  /**
	 * URL(s) to your Sonarr instance(s), included in the same way as torznab
	 * URLs but for your Sonarr: note that api is not at the end. see below.
	 *
	 * You should order these in most likely to match -> the least likely order.
	 * They are searched sequentially as they are listed.
	 *
	 * This apikey parameter comes from Sonarr
	 *
	 * Example: sonarr: ["http://sonarr:8989/?apikey=12345"],
	 *
	 *      sonarr: ["http://sonarr:8989/?apikey=12345",
	 *               "http://sonarr4k:8989/?apikey=12345"],
	 */
  sonarr: [
    "https://{{ cross_seed_sonarr_hostname }}/?apikey={{ cross_seed_sonarr_api_key }}",             // TV
    "https://{{ cross_seed_sonarr4k_hostname }}/?apikey={{ cross_seed_sonarr4k_api_key }}",         // TV 4K
    "https://{{ cross_seed_sonarr_anime_hostname }}/?apikey={{ cross_seed_sonarr_anime_api_key }}", // TV Anime
  ],
  /**
	 * URL(s) to your Radarr instance(s), included in the same way as torznab
	 * URLs but for your Radarr: note that api is not at the end. see below.
	 *
	 * You should order these in most likely to match -> the least likely order.
	 * They are searched sequentially as they are listed.
	 *
	 * This apikey parameter comes from Radarr
	 *
	 * Example: radarr: ["http://radarr:7878/?apikey=12345"],
	 *
	 *       radarr: ["http://radarr:7878/?apikey=12345",
	 *                "http://radarr4k:7878/?apikey=12345"],
	 */
  radarr: [
    "https://{{ cross_seed_radarr_hostname }}/?apikey={{ cross_seed_radarr_api_key }}",             // Movies
    "https://{{ cross_seed_radarr4k_hostname }}/?apikey={{ cross_seed_radarr4k_api_key }}",         // Movies 4K
    "https://{{ cross_seed_radarr_anime_hostname }}/?apikey={{ cross_seed_radarr_anime_api_key }}", // Movies Anime
  ],
  /**
   * To search with downloaded data, you can pass in directories to your downloaded torrent
   * data to find matches rather using the torrent files themselves for matching.
   *
   * If enabled, this needs to be surrounded by brackets. Windows users will need to use
   * double backslash in all paths in this config.
   * e.g.
   *          dataDirs: ["/path/here"],
   *          dataDirs: ["/path/here", "/other/path/here"],
   *          dataDirs: ["C:\\My Data\\Downloads"]
   */
  dataDirs: [],
  /**
   * Determines flexibility of naming during matching. "safe" will allow only perfect name matches
   * using the standard matching algorithm. "risky" uses filesize as its only comparison point.
   * Options: "safe", "risky", "partial"
   */
  matchMode: "partial",
  /**
   * Defines what category torrents injected by data-based matching should use.
   * Default is "cross-seed-data"
   */
  dataCategory: undefined,
  /**
   * If this is specified, cross-seed will create links to scanned files in the specified directory.
   * It will create a different link for every changed file name or directory structure.
   */
  linkDir: "/data/media/cross-seed-links",
  /**
   * cross-seed will use links of this type to inject data-based matches into your client.
   * Only relevant if dataDirs is specified.
   * Options: "symlink", "hardlink"
   */
  linkType: "hardlink",
	/**
	 * Enabling this will link files using v5's flat folder style.
	 *
	 * Each individual Torznab tracker's cross-seeds, otherwise, will have its
	 * own folder with the tracker's name and it's links within it.
	 *
	 * If using Automatic Torrent Management in qBittorrent, please read:
	 * https://www.cross-seed.org/docs/basics/options#flatlinking
	 *
	 * Default: false.
	 */
	flatLinking: false,
  /**
   * Whether to skip recheck in Qbittorrent. If using "risky" matchMode it is HIGHLY
   * recommended to set this to false.
   * Only applies to data based matches.
   */
  skipRecheck: false,
  /**
   * Determines how deep into the specified dataDirs to go to generate new searchees.
   * Setting this to higher values will result in more searchees and more API hits to
   * your indexers.
   */
  maxDataDepth: 2,
  /**
   * Directory containing .torrent files.
   * For qBittorrent, this is BT_Backup
   * For rtorrent, this is your session directory
   *          as configured in your .rtorrent.rc file.
   * For Deluge, this is ~/.config/deluge/state.
   * For Transmission, this would be ~/.config/transmission/torrents
   *
   * Don't change this for Docker.
   * Instead set the volume mapping on your docker container.
   */
  torrentDir: "/torrents",
  /**
   * Where to put the torrent files that cross-seed finds for you.
   * Don't change this for Docker.
   * Instead set the volume mapping on your docker container.
   */
  outputDir: "/cross-seeds",
	/**
	 * Whether to include single episode torrents in a search (not those from
	 * season packs).
	 *
	 * This setting does not affect matching episodes from rss and
	 * announce.
	 */
  includeSingleEpisodes: true,
	/**
	 * Include torrents which are comprised of non-video files.
	 *
	 * If this option is set to false, any folders or torrents whose
	 * totalNonVideoFilesSize / totalSize > fuzzySizeThreshold
	 * will be excluded.
	 *
	 * For example, if you have .srt or .nfo files inside a torrent, using
	 * false will still allow the torrent to be considered for cross-seeding
	 * while disallowing torrents that are music, games, books, etc.
	 * For full disc based folders (not .ISO) you may wish to set this as true.
	 *
	 * To search for all video media except individual episodes, use:
	 *
	 *    includeSingleEpisodes: false
	 *    includeNonVideos: false
	 *
	 * To search for all video media including individual episodes, use:
	 *
	 *    includeSingleEpisodes: true
	 *    includeNonVideos: false
	 *
	 * To search for absolutely ALL types of content, including non-video, configure
	 * your episode settings based on the above examples and use:
	 *
	 *     includeNonVideos: true
	 */
  includeNonVideos: true,
	/**
	 * You should NOT modify this unless you have good reason.
	 * The following option is the preliminary value to compare sizes of
	 * releases for further comparison.
	 *
	 * decimal value (0.02 = 2%)
	 */  
  fuzzySizeThreshold: 0.02,
  /**
   * Exclude torrents first seen more than this long ago.
   * Format: https://github.com/vercel/ms
   * Examples:
   * "10min"
   * "2w"
   * "3 days"
   */
  excludeOlder: "12 weeks",
  /**
	 * Exclude torrents which have been searched more recently than this long
	 * ago.
	 * Doesn't exclude previously failed searches.
	 * Examples:
	 * "2 days"
	 * "5 days"
	 *
	 * This value must be 2-5x less than excludeOlder.
	 */  
  excludeRecentSearch: "4 weeks",
  /**
   * With "inject" you need to set up one of the below clients.
   * Options: "save", "inject"
   */
  action: "inject",
  /**
   * The url of your rtorrent XMLRPC interface.
   * Only relevant with action: "inject".
   * Could be something like "http://username:password@localhost:1234/RPC2
   */
  rtorrentRpcUrl: undefined,
  /**
   * The url of your qBittorrent webui.
   * Only relevant with action: "inject".
   * Supply your username and password inside the url like so:
   * "http://username:password@localhost:8080"
   */
  qbittorrentUrl:
    "http://admin:{{ cross_seed_qbit_password }}@qbittorrent:8080",
  /**
   * The url of your Transmission RPC interface.
   * Usually ends with "/transmission/rpc".
   * Only relevant with action: "inject".
   * Supply your username and password inside the url like so:
   * "http://username:password@localhost:9091/transmission/rpc"
   */
  transmissionRpcUrl: undefined,
  /**
   * The url of your Deluge JSON-RPC interface.
   * Usually ends with "/json".
   * Only relevant with action: "inject".
   * Supply your WebUI password as well
   * "http://:password@localhost:8112/json"
   */
  delugeRpcUrl: undefined,
  /**
   * qBittorrent and Deluge specific
   * Whether to inject using the same labels/categories as the original torrent.
   * qBittorrent: This will apply the category's save path
   * Example: if you have a label/category called "Movies",
   * this will automatically inject cross-seeds to "Movies.cross-seed"
   */
  duplicateCategories: true,
  /**
   * cross-seed will send POST requests to this url
   * with a JSON payload of { title, body }.
   * Conforms to the caronc/apprise REST API.
   */
  notificationWebhookUrl:
    "https://{{ cross_seed_ntfy_hostname }}/Cross-seed?auth={{ cross_seed_ntfy_auth }}",
  /**
   * Listen on a custom port.
   */
  port: 2468,
  /**
   * Bind to a specific host address.
   * Example: "127.0.0.1"
   * Default is "0.0.0.0"
   */
  host: undefined,
  /**
   * Run rss scans on a schedule. Format: https://github.com/vercel/ms
   * Set to undefined or null to disable. Minimum of 10 minutes.
   * Examples:
   * "10min"
   * "2w"
   * "3 days"
   */
  rssCadence: "10min",
  /**
   * Run searches on a schedule. Format: https://github.com/vercel/ms
   * Set to undefined or null to disable. Minimum of 1 day.
   * If you have RSS enabled, you won't need this to run often (2+ weeks recommended)
   * Examples:
   * "10min"
   * "2w"
   * "3 days"
   */
  searchCadence: "1 week",
  /**
   * Fail snatch requests that haven't responded after this long.
   * Set to null for an infinite timeout.
   * Format: https://github.com/vercel/ms
   * Examples:
   * "30sec"
   * "10s"
   * "1min"
   * null
   */
  snatchTimeout: undefined,
  /**
   * Fail search requests that haven't responded after this long.
   * Set to null for an infinite timeout.
   * Format: https://github.com/vercel/ms
   * Examples:
   * "30sec"
   * "10s"
   * "1min"
   * null
   */
  searchTimeout: undefined,
  /**
   * The number of searches to be done before it stops.
   * Combine this with "excludeRecentSearch" and "searchCadence" to smooth long-term API usage patterns.
   * Default is no limit.
   */
  searchLimit: undefined,
	/**
	 * The list of infohashes or strings which are contained in torrents that
	 * you want to be excluded from cross-seed. This is the same format as
	 * torznab, surround the entire set of quoted strings in square brackets
	 * You can use any combination which must be entered on the one line.
	 * Leave as undefined to disable.
	 *
	 * examples:
	 *
	 *    blockList: ["-excludedGroup", "-excludedGroup2"],
	 *    blocklist: ["x265"],
	 *    blocklist: ["Release.Name"],
	 *    blocklist: ["3317e6485454354751555555366a8308c1e92093"],
	 */
	blockList: undefined,
};
//# sourceMappingURL=config.template.docker.cjs.map
