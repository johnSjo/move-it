import Logo from '../assets/images/move_it_logo_shape.svg';

const Header = () => {
  return (
    <a href='/'>
      <h1 className='header'>
        Move
        <img src={Logo} alt='MoveIT logo' height={100} width={100} />
        IT
      </h1>
    </a>
  );
};

export default Header;
