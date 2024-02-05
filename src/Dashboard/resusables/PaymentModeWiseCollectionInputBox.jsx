import { Option, Select } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

const wardData = [
  {
    id: 124,
    zone_mstr_id: 16,
    ward_name: "1",
    area_name: "JANUWANI",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 125,
    zone_mstr_id: 16,
    ward_name: "2",
    area_name: "ISMRITI NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 126,
    zone_mstr_id: 16,
    ward_name: "3",
    area_name: "KOSANAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 127,
    zone_mstr_id: 16,
    ward_name: "4",
    area_name: "RADHIKA NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 128,
    zone_mstr_id: 16,
    ward_name: "5",
    area_name: "LAXMI NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 129,
    zone_mstr_id: 16,
    ward_name: "6",
    area_name: "SUPAILA BAZAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 130,
    zone_mstr_id: 16,
    ward_name: "7",
    area_name: "FARID NAGAR KOHAKA",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 131,
    zone_mstr_id: 16,
    ward_name: "8",
    area_name: "RANI AWANTIKABAI KOHAKA",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 132,
    zone_mstr_id: 16,
    ward_name: "9",
    area_name: "PURANI BASTI KHOHKA",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 133,
    zone_mstr_id: 16,
    ward_name: "12",
    area_name: "CONTACTOR COLONY",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 134,
    zone_mstr_id: 16,
    ward_name: "67",
    area_name: "SECTOR-08",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 135,
    zone_mstr_id: 16,
    ward_name: "69",
    area_name: "SHAHID KHAUSHAL NAGAR SOUTH",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 136,
    zone_mstr_id: 16,
    ward_name: "70",
    area_name: "SHAHID KHAUSHAL NAGAR NORTH",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 137,
    zone_mstr_id: 16,
    ward_name: "10",
    area_name: "SHANTI NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 138,
    zone_mstr_id: 16,
    ward_name: "11",
    area_name: "AMBEDKAR NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 139,
    zone_mstr_id: 16,
    ward_name: "13",
    area_name: "RAJIV NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 140,
    zone_mstr_id: 17,
    ward_name: "14",
    area_name: "RAMNAGAR MUKTIDHAM",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 141,
    zone_mstr_id: 17,
    ward_name: "15",
    area_name: "VAISHALI NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 142,
    zone_mstr_id: 16,
    ward_name: "16",
    area_name: "KURUD",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 143,
    zone_mstr_id: 16,
    ward_name: "17",
    area_name: "VIRNDA NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 144,
    zone_mstr_id: 17,
    ward_name: "18",
    area_name: "PREM NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 145,
    zone_mstr_id: 17,
    ward_name: "19",
    area_name: "SHASTRI NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 146,
    zone_mstr_id: 17,
    ward_name: "26",
    area_name: "HOUSING BOARD",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 147,
    zone_mstr_id: 17,
    ward_name: "27",
    area_name: "GHASHIDAS NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 148,
    zone_mstr_id: 17,
    ward_name: "20",
    area_name: "PRAGTI NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 149,
    zone_mstr_id: 17,
    ward_name: "21",
    area_name: "SUNDAR NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 150,
    zone_mstr_id: 17,
    ward_name: "22",
    area_name: "SHYAM NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 151,
    zone_mstr_id: 17,
    ward_name: "23",
    area_name: "RAVIDAS NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 152,
    zone_mstr_id: 17,
    ward_name: "24",
    area_name: "SHARDAPARA",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 153,
    zone_mstr_id: 17,
    ward_name: "25",
    area_name: "SANTOSHIPARA",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 154,
    zone_mstr_id: 19,
    ward_name: "46",
    area_name: "SECTOR-03",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 155,
    zone_mstr_id: 19,
    ward_name: "47",
    area_name: "SECTOR-01 SOUTH",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 156,
    zone_mstr_id: 19,
    ward_name: "48",
    area_name: "SECTOR-01 NORTH",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 157,
    zone_mstr_id: 19,
    ward_name: "49",
    area_name: "SECTOR-02 EAST",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 158,
    zone_mstr_id: 19,
    ward_name: "50",
    area_name: "SECTOR-02 WEST",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 159,
    zone_mstr_id: 17,
    ward_name: "28",
    area_name: "CHHAWANI BASTI",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 160,
    zone_mstr_id: 17,
    ward_name: "29",
    area_name: "KHURSIPAR ZONE-2 BAPU NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 161,
    zone_mstr_id: 18,
    ward_name: "30",
    area_name: "KHURSI ZONE-2 BALAJEE NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 162,
    zone_mstr_id: 18,
    ward_name: "31",
    area_name: "KHURSI ZONE-3 DURGA MANDIR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 163,
    zone_mstr_id: 18,
    ward_name: "32",
    area_name: "NEW KHURSI RADHAKRISHN MANDIR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 164,
    zone_mstr_id: 18,
    ward_name: "33",
    area_name: "KHURSI ZONE-3  ",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 165,
    zone_mstr_id: 18,
    ward_name: "34",
    area_name: "SUBHASH NAGAR KHURSI ZONE-2",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 166,
    zone_mstr_id: 18,
    ward_name: "35",
    area_name: "SHASTRI NAGAR KHURSI ZONE-2",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 167,
    zone_mstr_id: 18,
    ward_name: "36",
    area_name: "GAUTAM NAGAR KHURSI ZONE-1",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 168,
    zone_mstr_id: 18,
    ward_name: "37",
    area_name: "CHANDR SHEKHAR AZAD NAGAR KHURSI ZONE-1",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 169,
    zone_mstr_id: 19,
    ward_name: "38",
    area_name: "S. V.R. NAGAR KHURSI",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 170,
    zone_mstr_id: 19,
    ward_name: "39",
    area_name: "PURAINA",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 171,
    zone_mstr_id: 19,
    ward_name: "51",
    area_name: "SECTOR-04 EAST",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 172,
    zone_mstr_id: 18,
    ward_name: "52",
    area_name: "SECTOR-04 WEST",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 173,
    zone_mstr_id: 18,
    ward_name: "53",
    area_name: "SECTOR-05 EAST ",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 174,
    zone_mstr_id: 18,
    ward_name: "54",
    area_name: "SECTOR-05 WEST",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 175,
    zone_mstr_id: 18,
    ward_name: "55",
    area_name: "SECTOR-06 EAST",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 176,
    zone_mstr_id: 18,
    ward_name: "56",
    area_name: "SECTOR-06 MIDDLE ",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 177,
    zone_mstr_id: 24,
    ward_name: "57",
    area_name: "SECTOR-06 WEST",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 178,
    zone_mstr_id: 24,
    ward_name: "64",
    area_name: "SECTOR-10",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 179,
    zone_mstr_id: 24,
    ward_name: "65",
    area_name: "SECTOR-07 EAST",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 180,
    zone_mstr_id: 24,
    ward_name: "66",
    area_name: "SECTOR-07 WEST",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 181,
    zone_mstr_id: 24,
    ward_name: "68",
    area_name: "SECTOR-09 HOUSING SECTOR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 182,
    zone_mstr_id: 19,
    ward_name: "40",
    area_name: "JORATARAI",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 183,
    zone_mstr_id: 19,
    ward_name: "41",
    area_name: "DUNDERA",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 184,
    zone_mstr_id: 19,
    ward_name: "42",
    area_name: "NEWAI BHATHA",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 185,
    zone_mstr_id: 19,
    ward_name: "43",
    area_name: "STATION MARODA",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 186,
    zone_mstr_id: 19,
    ward_name: "44",
    area_name: "MARODA CAMP MOHARI MATHA",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 187,
    zone_mstr_id: 19,
    ward_name: "45",
    area_name: "MARODA SECTOR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 188,
    zone_mstr_id: 19,
    ward_name: "58",
    area_name: "RISALI SECTOR NORTH",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 189,
    zone_mstr_id: 19,
    ward_name: "59",
    area_name: "RISALI SECTOR SOUTH",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 190,
    zone_mstr_id: 19,
    ward_name: "60",
    area_name: "RISALI BASTI",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 191,
    zone_mstr_id: 19,
    ward_name: "61",
    area_name: "PRAGATI NAGAR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 192,
    zone_mstr_id: 19,
    ward_name: "62",
    area_name: "RUWABANDHA SECTOR",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 193,
    zone_mstr_id: 19,
    ward_name: "63",
    area_name: "RUWABANDHA BASTI",
    stampdate: "2017-07-28",
    user_id: 1,
    status: "1",
  },
  {
    id: 426,
    zone_mstr_id: 19,
    ward_name: "0",
    area_name: "RUWABANDHA BASTI",
    stampdate: "2022-02-23",
    user_id: 1,
    status: "1",
  },
];

function UtilityDiv({ isDateBox, title, setSearchQueryObj }) {
  return (
    <div className="xs:block gap-2.5 align-middle sm:block md:block lg:flex">
      <p className="whitespace-nowrap px-4 py-2 text-xs font-medium  font-semibold text-gray-900">
        {title}{" "}
        <span className="className='contents font-bold' text-xs text-red-600">
          *
        </span>
      </p>
      {isDateBox ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            id="dd_date"
            // onChange={handlePaymentTransactionDetailsChange}
            inputFormat="MM/DD/YYYY"
            renderInput={(params) => <TextField {...params} />}
            // value={paymentTransactionDetails.dd_date}
          />
        </LocalizationProvider>
      ) : (
        <Select
          //   onChange={(e) => handleDataSet(e)}
          label="select"
          className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
        >
          {wardData.length > 0 ? (
            wardData.map((item) => {
              const {
                id,
                zone_mstr_id,
                ward_name,
                area_name,
                stampdate,
                user_id,
                status,
              } = item;
              return (
                <Option
                  key={id}
                  value={JSON.stringify(item)}
                >{`${ward_name}`}</Option>
              );
            })
          ) : (
            <Option>Loading...</Option>
          )}
        </Select>
      )}
    </div>
  );
}

const PaymentModeWiseCollectionInputBox = ({ setSearchQueryObj }) => {
  return (
    <div className="my-5 shadow">
      <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
        <h2 className="text-center text-sm font-semibold text-white">
          Payment mode wise collection
        </h2>
      </nav>
      <div className="flex-wrap gap-5 p-4 lg:flex">
        <UtilityDiv isDateBox={true} title={"Date from"} />
        <UtilityDiv isDateBox={true} title={"Date to"} />
        <UtilityDiv isDateBox={false} title={"Ward no"} />
      </div>
    </div>
  );
};

export default PaymentModeWiseCollectionInputBox;
