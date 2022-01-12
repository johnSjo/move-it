import Logo from '../assets/images/move_it_logo_shape.svg';

const Header = () => {
  return (
    <div className='header'>
      <a href='/'>
        <h1>
          Move
          <img src={Logo} alt='MoveIT logo' height={100} width={100} />
          IT
        </h1>
      </a>
    </div>
  );
};

export default Header;
