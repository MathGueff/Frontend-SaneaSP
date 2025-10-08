import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  CategoryGroup,
  ICategory,
} from "@features/categoria/models/category.model";
import { IComplaint } from "@features/denuncia/models/complaint.model";
import { IAddress } from "@shared/models/address.model";
import { IIcon } from "@shared/models/icon.model";

@Component({
  selector: "app-complaint-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./complaint-detail.component.html",
  styleUrl: "./complaint-detail.component.css",
})
export class ComplaintDetailComponent {
  @Input() complaint!: IComplaint;

  protected MAX_CATEGORIES = 5;

  waterIcon: IIcon = { folder: "entities", name: "water", alt: "" };
  drainageIcon: IIcon = { folder: "entities", name: "drainage", alt: "" };
  sewageIcon: IIcon = { folder: "entities", name: "sewage", alt: "" };
  cleaningIcon: IIcon = { folder: "entities", name: "cleaning", alt: "" };

  getCategoryIcon(category: ICategory): IIcon {
    let icon: IIcon;
    switch (category.grupo) {
      case CategoryGroup.WATER:
        icon = this.waterIcon;
        break;
      case CategoryGroup.DRAINAGE:
        icon = this.drainageIcon;
        break;
      case CategoryGroup.SEWAGE:
        icon = this.sewageIcon;
        break;
      case CategoryGroup.CLEANING:
        icon = this.cleaningIcon;
        break;
    }
    return icon;
  }

  getFullAddress(address: IAddress): string {
    if (!address) return "";
    const { logradouro, numero, complemento, bairro, cidade } = address;
    const parts: string[] = [];

    if (logradouro) parts.push(logradouro);
    if (numero) parts.push(numero);
    if (complemento) parts.push(complemento);

    const main = parts.join(", ");
    const location = [bairro, cidade].filter(Boolean).join(", ");

    return [main, location].filter(Boolean).join(" - ");
  }

  getFormattedDate(dateStr: string): string {
    const date = new Date(dateStr);
    if (!date) return "";
    const pad = (n: number) => n.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }
}
