import { OrganizationList } from "@clerk/nextjs";
const OrgSelectionView = () => {
  return (
    <OrganizationList
      afterCreateOrganizationUrl={"/"}
      afterSelectOrganizationUrl={"/"}
      hidePersonal={true}
      skipInvitationScreen={true}
    />
  );
};

export default OrgSelectionView;
