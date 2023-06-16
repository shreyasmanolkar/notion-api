export type ProfilePictureType = {
  url: string;
};

export type WorkspaceType = {
  workspaceId: string;
  workspaceName: string;
  workspaceIcon: string;
  favorites: string[];
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  isDarkMode: boolean;
  profilePicture: ProfilePictureType;
  workspaces: WorkspaceType[];
  createdAt: Date;
  updatedAt?: Date;
};

export class User {
  public readonly id: string;

  public readonly name: string;

  public readonly email: string;

  public readonly password: string;

  public readonly isDarkMode: boolean;

  public readonly profilePicture: ProfilePictureType;

  public readonly workspaces: WorkspaceType[];

  public readonly createdAt: Date;

  public readonly updatedAt?: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.isDarkMode = props.isDarkMode;
    this.profilePicture = props.profilePicture;
    this.workspaces = props.workspaces;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
