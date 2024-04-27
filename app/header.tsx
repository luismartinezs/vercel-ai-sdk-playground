import React from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/load", label: "Load" },
  { href: "/streaming", label: "Streaming" },
  { href: "/completion", label: "Completion" },
  { href: "/assistant", label: "Assistant" },
  // append new link
];

const Header = () => {
  return (
    <nav
      className="
      flex
      justify-between
      items-center
      py-4
      md:justify-start
      md:space-x-4
      border-b
      border-gray-500
      "
    >
      <ul className="
      flex
      flw-wrap
      gap-4
      ">
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
