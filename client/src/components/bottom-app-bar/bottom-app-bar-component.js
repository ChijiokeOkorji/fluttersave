import { AppBar } from '../app-bar';
import { IconLinkButton } from '../icon-link-button';

const BottomAppBar = () => {
  return (
    <AppBar isBottom={true}>
      <IconLinkButton to="/home" className="fa-solid fa-house-chimney" caption="Home" />

      <IconLinkButton to="/history" className="fa-solid fa-clock-rotate-left" caption="History" />

      <IconLinkButton to="/profile" className="fa-solid fa-user" caption="Profile" />
    </AppBar>
  );
};

export { BottomAppBar };
