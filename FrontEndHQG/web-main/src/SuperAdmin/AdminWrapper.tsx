import { Link, Outlet } from "@tanstack/react-location";
import { MainHeader } from "../Common/MainHeader";
import { useAuth } from "../Hooks/AuthContext";
import { log } from "console";

export const AdminWrapper = () => {
  const auth = useAuth();

  const links: LinkItemProps[] = [
    {
      to: `/${auth?.user?.id}/admin`,
      title: "Manage Users",
    },
    {
      to: `/${auth?.user?.id}/admin/connect`,
      title: "Connect Users",
    },
  ];

  return (
    <div>
      <MainHeader />
      <div className="flex flex-row bg-charcoal py-2">
        {links.map((link) => (
          <LinkItem key={link.to} to={link.to} title={link.title} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};
interface LinkItemProps {
  to: string;
  title: string;
}

const LinkItem = ({ to, title }: LinkItemProps) => {
  return (
    <Link to={to} activeOptions={{ exact: true }}>
      {(props) => {
        return (
          <div
            className={`${
              props.isActive ? "text-charcoal bg-light-grey" : ""
            } p-4 text-white text-lg hover:bg-white hover:text-charcoal `}
          >
            {title}
          </div>
        );
      }}
    </Link>
  );
};
