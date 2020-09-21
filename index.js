require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

let urls = [
    {

        url : 'https://www.amazon.fr/Staedtler-plastic-plastique-phtalate-52650/dp/B003A6I1QG/ref=sr_1_5?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=staedtler&qid=1600723282&sr=8-5',
        asin: 'B003A6I1QG'
    },
    {
        url: 'https://www.amazon.fr/Staedtler-fineliner-lumineuses-334-SB20/dp/B0007OEE7E/ref=sxin_9_ac_d_rm?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ac_md=1-1-c3RhZWR0bGVyIHRyaXBsdXMgZmluZWxpbmVy-ac_d_rm&cv_ct_cx=staedtler&dchild=1&keywords=staedtler&pd_rd_i=B0007OEE7E&pd_rd_r=81ca698e-249f-4589-a19e-53c898201e05&pd_rd_w=1sCNv&pd_rd_wg=2ZMN9&pf_rd_p=1a27e10e-93b8-47cd-a2db-86fc30851216&pf_rd_r=4F6E31115GRN54QA6DZD&psc=1&qid=1600727837&sr=1-2-fe323411-17bb-433b-b2f8-c44f2e1370d4',
        asin: 'B0007OEE7E'
    }
    
]
    
const fetchData = async (callback) => {
        for (let i=0; i<urls.length; i++) {
            const result = await axios.get(urls[i].url);
            const $ = cheerio.load(result.data);
            const vendor = $('#merchant-info').text();
            const regex = "Amazon";
            let found = vendor.match(regex);
            callback({asin: urls[i].asin, state: found });
        }

    };
    
fetchData( (callback) => {
        console.log(callback);
});
    

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



    