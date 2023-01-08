import { propTypes } from "prop-types";
import { Helmet } from "react-helmet-async";

function PageTitle({ title }) {
  return (
    <Helmet>
      <title>{title} | Instaclone </title>
    </Helmet>
  );
}
PageTitle.propTypes = {
  title: propTypes.string.isRequired,
};
export default PageTitle;
