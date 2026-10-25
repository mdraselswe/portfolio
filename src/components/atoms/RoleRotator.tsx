/** Job titles. The full list is always in the DOM for screen readers and crawlers; `siteScript` cycles the visible one. */
export default function RoleRotator({ roles }: { roles: readonly string[] }) {
  return (
    <p className="relative mt-6 h-10 overflow-hidden font-display text-2xl font-semibold text-accent sm:text-3xl">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden data-roles={JSON.stringify(roles)} className="role-in block">
        {roles[0]}
      </span>
    </p>
  );
}
