import React, { PureComponent } from 'react';

const icon = `${process.env.PUBLIC_URL}/img/burger.svg`;

class TopbarSidebarButton extends PureComponent {
  render() {
    const { changeMobileSidebarVisibility, changeSidebarVisibility } = this.props;
    return (
      <div>
        <button className="topbar__button topbar__button--desktop" type="button" onClick={changeSidebarVisibility}>
          <img src={icon} alt="" className="topbar__button-icon" />
        </button>
        <button className="topbar__button topbar__button--mobile" type="button" onClick={changeMobileSidebarVisibility}>
          <img src={icon} alt="" className="topbar__button-icon" />
        </button>
      </div>
    );
  }
}

export default TopbarSidebarButton;