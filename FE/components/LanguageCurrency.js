import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Switch } from "./components/ui/switch";

const languages = [
  { code: "vi", name: "Tiếng Việt", region: "Việt Nam" },
  { code: "en-US", name: "English", region: "United States" },
  { code: "en-GB", name: "English", region: "United Kingdom" },
  { code: "de", name: "Deutsch", region: "Deutschland" },
  { code: "es", name: "Español", region: "España" },
];

const currencies = ["VND", "USD", "EUR", "GBP", "JPY"];

export default function LanguageCurrencySelector() {
  const [language, setLanguage] = useState("vi");
  const [currency, setCurrency] = useState("VND");
  const [autoTranslate, setAutoTranslate] = useState(true);

  return (
    <div className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Ngôn ngữ và khu vực</h2>
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <span>Bản dịch</span>
            <Switch checked={autoTranslate} onCheckedChange={setAutoTranslate} />
          </div>
          <div className="mb-4">
            <h3 className="text-md font-medium mb-2">Chọn ngôn ngữ và khu vực</h3>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn ngôn ngữ" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name} ({lang.region})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Loại tiền tệ</h3>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn tiền tệ" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr} value={curr}>
                    {curr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
