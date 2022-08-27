import { HttpException, HttpStatus } from "@nestjs/common";
import { CreatorPayload } from "src/common/guards/creator/creator.types";

const kErrorMessages = {
  default: "You are not authorized to do this operation.",
  notFound: (model: CreatorPayload["model"]) => `The ${model} you are looking for is not found.`,
  notCreator: (model: CreatorPayload["model"], method: string) =>
    `You are forbidden to ${method} this ${model}.`,
} as const;

export class CreatorException extends HttpException {
  constructor({
    messageBuilder,
  }: {
    messageBuilder: (errorMessages: typeof kErrorMessages) => string;
  }) {
    super(messageBuilder(kErrorMessages), HttpStatus.FORBIDDEN);
  }
}
