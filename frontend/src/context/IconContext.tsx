import React from "react";
import { IconContext, IconType } from "react-icons";

interface IconCustomProps {
  Icon: IconType;
  className?: string;
  size?: string;
  color: string;
  iconstyle?: string;
  iconAction?: () => any;
}
interface IconCustomState {
  iconstyle: string;
}
export class IconCustom extends React.Component<
  IconCustomProps,
  IconCustomState
> {
  constructor(props: IconCustomProps) {
    super(props);
    this.state = {
      iconstyle: this.props?.iconstyle ? this.props?.iconstyle : ""
    };
    this.clickAction = this.clickAction.bind(this);
  }
  clickAction() {
    if (this.props.iconAction) {
      console.log("click action");
      return this.props.iconAction();
    }
    return console.log("");
  }
  render() {
    return (
      <div>
        <IconContext.Provider
          value={{
            size: this.props.size,
            color: this.props.color,
            className: this.state.iconstyle
          }}
        >
          <this.props.Icon
            onClick={() => this.clickAction()}
            className={this.props.className}
          />
        </IconContext.Provider>
      </div>
    );
  }
}
