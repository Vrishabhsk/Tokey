import { Card } from "@nextui-org/react";
import GeneratorContent from "../../components/GeneratorContent";

export default function PasswordGenerator() {
  return (
    <div className="main-container">
      <GeneratorContent Header={Card.Header} Body={Card.Body} />
    </div>
  );
}
