import businessSector from './common/businessSector';
import educationLevel from './common/educationLevel';
import gender from './common/gender';
import home from './common/home';
import isMyApartment from './common/isMyApartment';

export const loanRequestListWaiting = {
  name: "Орлого",
  isd: 0,
  isedit: 0,
  isadd: 0,
  ispaginate: 1,
  cols: [
    {
      t: "Харилцагч",
      k: "customer",
      tp: "text",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "username",
      st: "text",
      ln: "/users/single#user_id",
      
    },
    {
      t: "Зээлийн хэмжээ",
      k: "loan_amt",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "loan_amount",
      st: "amount",
      
      
    },
    {
      t: "Зээлийн хүү",
      k: "loan_rate",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "rate_amt",
      st: "number",
      
      
    },
    {
      t: "Зээлийн хугацаа",
      k: "loan_term",
      tp: "text",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "loan_term",
      st: "text",
      
      
    },
    {
      t: "Зээлийн чанар",
      k: "loan_status",
      tp: "select",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "loan_status",
      st: "select",
      
      
    },
    {
      t: "Хүсэлт гаргасан огноо",
      k: "requested_date",
      tp: "date",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "requested_date",
      st: "date",
      
      
    },
    {
      t: "Хүсэлт дуусах огноо",
      k: "request_valid_until",
      tp: "date",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "request_valid_until",
      st: "date",
      
      
    },
    {
      t: "Зээлийн түүх",
      k: "loan_history",
      tp: "select",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "loan_history",
      st: "text",
      
      opts: [
        {
          id: "Муу",
          name: "Муу",
        },
        {
          id: "Хэвийн",
          name: "Хэвийн",
        },
        {
          id: "Хугацаа хэтэрсэн",
          name: "Хугацаа хэтэрсэн",
        },
        {
          id: "Тэнцлийн гадуур бүртгэсэн",
          name: "Тэнцлийн гадуур бүртгэсэн",
        },
        {
          id: "Хэвийн бус",
          name: "Хэвийн бус",
        },
        {
          id: "Эргэлзээтэй",
          name: "Эргэлзээтэй",
        },
      ],
    },
    {
      t: "Зээлийн түүх 2",
      k: "loan_history2",
      tp: "select",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "loan_history2",
      st: "text",
      
      opts: [
        {
          id: "Муу",
          name: "Муу",
        },
        {
          id: "Хэвийн",
          name: "Хэвийн",
        },
        {
          id: "Хугацаа хэтэрсэн",
          name: "Хугацаа хэтэрсэн",
        },
        {
          id: "Тэнцлийн гадуур бүртгэсэн",
          name: "Тэнцлийн гадуур бүртгэсэн",
        },
        {
          id: "Хэвийн бус",
          name: "Хэвийн бус",
        },
        {
          id: "Эргэлзээтэй",
          name: "Эргэлзээтэй",
        },
      ],
    },
    {
      t: "Орлого",
      k: "income",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "income",
      st: "amount",
      
      
    },
    {
      t: "Өрхийн зардал",
      k: "outcome",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "outcome",
      st: "amount",
      
      
    },
    {
      t: "Дундаж орлого",
      k: "average_income",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "loan_limit",
      st: "amount",
      
      
    },
    {
      t: "Дундаж зарлага",
      k: "average_outcome",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "loan_limit",
      st: "amount",
      
      
    },
    {
      t: "Зээлийн эрх",
      k: "loan_limit",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "loan_limit",
      st: "amount",
      
      
    },
    {
      t: "Зээлийн давтамж",
      k: "loan_cnt",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "loan_cnt",
      st: "amount",
      
      
    },
    {
      t: "Matchable",
      k: "matchable",
      tp: "select",
      w: "10%",
      s: 1,
      isc: 1,
      sk: "matchable",
      st: "number",
      
      opts: [
        {
          id: 0,
          name: 0,
        },
        {
          id: 1,
          name: 1,
        },
      ],
    },
    {
      t: "Админ цэсний мэдээллээс шүүх",
      tp: "separator",
    },
    {
      ...gender,
      isc: 0,
    },
    {
      t: "Нас",
      k: "age",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "age",
      st: "amount",
      
      
    },
    {
      t: "Банк",
      k: "bank",
      tp: "select",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "bank_id",
      st: "number",
      
      opts: [
        {
          id: "1",
          name: "Худалдаа хөгжлийн банк",
        },
        {
          id: "3",
          name: "Голомт банк",
        },
        {
          id: "4",
          name: "Төрийн банк",
        },
        {
          id: "2",
          name: "Хаан банк",
        },
        {
          id: "5",
          name: "Хас банк",
        },
      ],
    },
    {
      t: "ЗМС дахь идэвхтэй зээлийн тоо",
      k: "zms_loan_cnt",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "zms_loan_cnt",
      st: "amount",
      
      
    },
    {
      t: "ЗМС дахь идэвхгүй зээлийн тоо",
      k: "zms_inactive_loan_cnt",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "zms_inactive_loan_cnt",
      st: "amount",
      
      
    },
    {
      t: "ЗМС дахь идэвхтэй зээлийн дүн",
      k: "zms_loan_amt",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "zms_loan_amt",
      st: "amount",
      
      
    },
    {
      t: "Оператор",
      k: "operator",
      tp: "select",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "operator",
      st: "number",
      
      opts: [
        {
          id: "1",
          name: "Мобиком",
        },
        {
          id: "2",
          name: "Юнител",
        },
        {
          id: "3",
          name: "Скайтел",
        },
        {
          id: "4",
          name: "Жи мобайл",
        },
      ],
    },
    {
      t: "Дансны орлого",
      k: "account_income",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "account_income",
      st: "amount",
      
      
    },
    {
      t: "Дансны зарлага",
      k: "account_outcome",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "account_outcome",
      st: "amount",
      
      
    },
    {
      t: "Мэйл холбосон эсэх",
      k: "is_email",
      tp: "select",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "is_email",
      st: "number",
      
      opts: [
        {
          id: 1,
          name: "Тийм",
        },
        {
          id: 0,
          name: "Үгүй",
        },
      ],
    },
    {
      t: "FB холбосон эсэх",
      k: "is_facebook",
      tp: "select",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "is_facebook",
      st: "number",
      
      opts: [
        {
          id: 1,
          name: "Тийм",
        },
        {
          id: 0,
          name: "Үгүй",
        },
      ],
    },
    {
      t: "Хувийн мэдээлэл анкет цэснээс шүүх",
      tp: "separator",
    },
    {
      ...educationLevel,
      isc: 0,
    },
    {
      t: "Гэрлэсэн эсэх",
      k: "is_married",
      tp: "select",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "is_married",
      st: "text",
      
      opts: [
        {
          id: "single",
          name: "Гэрлээгүй",
        },
        {
          id: "married",
          name: "Гэрлэсэн",
        },
        {
          id: "widow",
          name: "Бэлэвсэн",
        },
        {
          id: "diforced",
          name: "Салсан",
        },
      ],
    },
    {
      ...home,
      isc: 0
    },
    {
      ...isMyApartment,
      isc: 0,
    },
    {
      t: "Өрхийн гишүүн",
      k: "family_count",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "family_count",
      st: "amount",
      
      
    },
    {
      t: "Санхүүгийн мэдээлэл",
      k: "income",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "income",
      st: "amount",
      
      
    },
    {
      t: "Сард төлдөг зээлийн дүн",
      k: "outcome",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "outcome",
      st: "amount",
      
      
    },
    {
      ...businessSector,
      isc: 0,
    },
    {
      t: "Нийт ажилласан жил",
      k: "worked_year",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "worked_year",
      st: "amount",
      
      
    },
    {
      t: "Нийт ажилласан байгууллагын тоо",
      k: "company_count",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "company_count",
      st: "amount",
      
      
    },
    {
      t: "Ажилласан жил",
      k: "worked_year_in_company",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "worked_year_in_company",
      st: "amount",
      
      
    },
    {
      t: "Хаяг дээр бүртгэлтэй эсэх",
      k: "in_address",
      tp: "select",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "in_address",
      st: "number",
      
      opts: [
        {
          id: 1,
          name: "Тийм",
        },
        {
          id: 0,
          name: "Үгүй",
        },
      ],
    },
    {
      t: "Тухайн хаяг дээрх амьдарч буй хугацаа",
      k: "in_address_year",
      tp: "amount",
      w: "10%",
      s: 1,
      isc: 0,
      sk: "in_address_year",
      st: "amount",
      
      
    },
  ],
};
