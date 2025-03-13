import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar backdrop-blur-md bg-neutral-100/80">
      <div className="flex-1">
        <Link className="btn btn-ghost" href="/">
          <Image src="/logo.svg" alt="Riverflex" width={145} height={23} />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/"> Chat </Link>
          </li>
          <li>
            <Link href="/import"> Import </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
