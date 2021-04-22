import { useHistory } from "react-router";

import * as Oxygen from "../../content/data/oxygen.json";
import * as Ambulance from "../../content/data/ambulance.json";
import * as Plasma from "../../content/data/plasma.json";
import * as Medicines from "../../content/data/medicines.json";
import * as Others from "../../content/data/others.json";

import APPLICATION_URL from "../../constants/application-routes";
import { HELP_CATEGORY } from "../../constants/constants";

let history;
let category;

function isSimpleCategory(category) {
  return (
    category === HELP_CATEGORY.AMBULANCE ||
    category === HELP_CATEGORY.OXYGEN ||
    category === HELP_CATEGORY.PLASMA
  );
}

function routeToHelpDetails(provider) {
  history.push({
    pathname: APPLICATION_URL.DETAILS,
    state: { category: category, provider: provider },
  });
}

function renderOthers(helpCategory) {
  return (
    <div>
      <label>Help Category:</label>
      <h1>{helpCategory.name}</h1>
      {helpCategory.providers.map((provider) => renderProvider(provider))}
    </div>
  );
}

function renderMedicine(medicine) {
  return (
    <div>
      <label>Medicine Name:</label>
      <h1>{medicine.name}</h1>
      {medicine.providers.map((provider) => renderProvider(provider))}
    </div>
  );
}

function renderProvider(provider) {
  return (
    <div onClick={() => routeToHelpDetails(provider)}>
      <label>Provider Name:</label>
      <h1>{provider.name}</h1>
      <label>Contact:</label>
      <h2>{provider.contact}</h2>
      <label>Staus:</label>
      <p>{provider.status}</p>
    </div>
  );
}

function HelpSummary(props) {
  category = props.category;
  history = useHistory();
  let help;

  switch (category) {
    case HELP_CATEGORY.OXYGEN:
      help = Oxygen.providers;
      break;
    case HELP_CATEGORY.AMBULANCE:
      help = Ambulance.providers;
      break;
    case HELP_CATEGORY.MEDICINES:
      help = Medicines.medicines;
      break;
    case HELP_CATEGORY.PLASMA:
      help = Plasma.providers;
      break;
    case HELP_CATEGORY.OTHERS:
      help = Others.helpCategories;
      break;
    default:
  }

  return (
    <div>
      {isSimpleCategory(category) &&
        help.map((provider) => renderProvider(provider))}
      {category === HELP_CATEGORY.MEDICINES &&
        help.map((medicine) => renderMedicine(medicine))}
      {category === HELP_CATEGORY.OTHERS &&
        help.map((helpCategory) => renderOthers(helpCategory))}
    </div>
  );
}

export default HelpSummary;