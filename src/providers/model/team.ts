/**
 * Appplatform backend
 * App platform
 *
 * OpenAPI spec version: 0.0.1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {Player} from "./player";
import {CheckboxSelectableInterface} from "../../core/interface/checkbox-selectable.interface";


export class Team implements CheckboxSelectableInterface{
    id?: number;
    name?: string;
    players?: Array<Player>;

  getTitle(): string {
    return this.name;
  }
}
