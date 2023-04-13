import styled from "styled-components";
import { Card, CardContent } from "@react-md/card";
import { Form, TextField } from "@react-md/form";

export const FormCard = styled(Card)`
  margin: 0 auto;
  width: 100%;
  display: flex;
  /* flex-basis: 100%; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    flex-direcion: row;
  }
`;

export const FormContent = styled(CardContent)`
  margin: 0 auto;
  width: 100%;
  display: flex;
  /* flex-basis: 100%; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    flex-direcion: row;
  }
`;

export const FormRow = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    flex-direcion: row;
  }
`;

