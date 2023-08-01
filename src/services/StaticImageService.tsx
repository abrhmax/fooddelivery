import { ApiConstant } from "../constants";

const getFlagIcon = (code="IN",style=ApiConstant.COUNTRY_FLAG.STYLE.FLAT,size=ApiConstant.COUNTRY_FLAG.SIZE[64]) =>`${ApiConstant.COUNTRY_FLAG.BASE_URL}/${code}/${style}/${size}.png`;

export default {getFlagIcon};