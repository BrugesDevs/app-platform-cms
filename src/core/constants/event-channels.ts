

export class EventChannels{

  /**NEWS ITEM EVENTS**/
  public static CHANNEL_NEWS_ITEMS_UPDATE: string = 'news-items:update';
  public static CHANNEL_NEWS_ITEMS_HIDE_REFRESHER: string = 'news-items:refresher:hide';

  public static CHANNEL_NEWS_ITEM_LOADED: string = 'news-item:loaded';
  public static CHANNEL_NEWS_ITEM_UPDATED: string = 'news-item:updated';
  public static CHANNEL_NEWS_ITEM_CREATED: string = 'news-item:created';
  public static CHANNEL_NEWS_ITEM_DELETED: string = 'news-item:deleted';


  /**PLAYER EVENTS**/
  public static CHANNEL_PLAYERS_UPDATE: string = 'players:update';
  public static CHANNEL_PLAYERS_HIDE_REFRESHER: string = 'players:refresher:hide';

  public static CHANNEL_PLAYER_LOADED: string = 'player:loaded';
  public static CHANNEL_PLAYER_UPDATED: string = 'player:updated';
  public static CHANNEL_PLAYER_CREATED: string = 'player:created';
  public static CHANNEL_PLAYER_DELETED: string = 'player:deleted';

  public static CHANNEL_PLAYER_TEAM_DELETE: string = 'player:team:deleted';
  public static CHANNEL_PLAYER_FILTERED_TEAMS: string = 'player:teams:filtered';

  /**TEAM EVENTS**/
  public static CHANNEL_TEAMS_UPDATE: string = 'teams:update';
  public static CHANNEL_TEAMS_HIDE_REFRESHER: string = 'teams:refresher:hide';

  public static CHANNEL_TEAM_LOADED: string = 'team:loaded';
  public static CHANNEL_TEAM_UPDATED: string = 'team:updated';
  public static CHANNEL_TEAM_CREATED: string = 'team:created';
  public static CHANNEL_TEAM_DELETED: string = 'team:deleted';

  public static CHANNEL_TEAM_PLAYER_DELETE: string = 'team:players:deleted';
  public static CHANNEL_TEAM_FILTERED_PLAYERS: string = 'team:players:filtered';

}
