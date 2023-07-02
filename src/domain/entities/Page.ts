export type PageSettingsType = {
  font: string;
  smallText: boolean;
  fullWidth: boolean;
  lock: boolean;
};

export type CoverPictureType = {
  url: string;
  verticalPosition: number;
};

export type ContentType = {
  type: string;
  content: unknown[];
};

export type PageProps = {
  id: string;
  reference: string;
  title: string;
  icon: string;
  coverPicture: CoverPictureType;
  content: ContentType;
  favorite: string[];
  pageSettings: PageSettingsType;
  path: string | null;
  workspaceId: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class Page {
  public readonly id: string;

  public readonly reference: string;

  public readonly title: string;

  public readonly icon: string;

  public readonly coverPicture: CoverPictureType;

  public readonly content: ContentType;

  public readonly favorite: string[];

  public readonly pageSettings: PageSettingsType;

  public readonly path: string | null;

  public readonly workspaceId: string;

  public readonly createdAt: Date;

  public readonly updatedAt?: Date;

  constructor(props: PageProps) {
    this.id = props.id;
    this.reference = props.reference;
    this.title = props.title;
    this.icon = props.icon;
    this.coverPicture = props.coverPicture;
    this.content = props.content;
    this.favorite = props.favorite;
    this.pageSettings = props.pageSettings;
    this.path = props.path;
    this.workspaceId = props.workspaceId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
