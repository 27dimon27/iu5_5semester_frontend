import type { SoftwareService, CartItem, Bid, BidIcon } from "../types";
import { API_BASE_URL } from '../config/api';

const isApiAvailable = () => API_BASE_URL !== null;

export const apiService = {
  // Получение всех услуг
  async getSoftwares(): Promise<SoftwareService[]> {
    if (!isApiAvailable()) {
      throw new Error("API not available in production");
    }
    const response = await fetch(`${API_BASE_URL}/softwares`);
    if (!response.ok) {
      throw new Error("Failed to get services");
    }
    const data = await response.json();
    return data.softwares;
  },

  // Получение услуги по ID
  async getSoftwareById(id: number): Promise<SoftwareService> {
    if (!isApiAvailable()) {
      throw new Error("API not available in production");
    }
    const response = await fetch(`${API_BASE_URL}/softwares/${id}`);
    if (!response.ok) {
      throw new Error("Failed to get service");
    }
    const data = await response.json();
    return data.software;
  },

  // Получение иконки корзины
  async getBidIcon(): Promise<BidIcon> {
    if (!isApiAvailable()) {
      throw new Error("API not available in production");
    }
    const response = await fetch(`${API_BASE_URL}/software-bids-icon`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch bid");
    }
    const data = await response.json();
    return {
      bidID: data.bidID,
      count: data.count,
    } as BidIcon;
  },

  // Получение заявки по ID
  async getBidById(id: number): Promise<Bid> {
    const response = await fetch(`${API_BASE_URL}/software-bids/${id}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch bid");
    }
    const data = await response.json();
    return {
      id: data.id,
      company: data.company,
      services: data.services.map((service: any) => ({
        softwareService: {
          id: service.softwareService.id,
          title: service.softwareService.title,
          description: service.softwareService.description,
          image: service.softwareService.image,
          price: service.softwareService.price,
          status: service.softwareService.status,
        },
        count: service.count,
        grade: service.grade,
        sum: service.sum,
      })),
      sum: data.sum,
    } as Bid;
  },

  // Обновление заявки
  async updateBid(bid: Bid): Promise<Bid> {
    const response = await fetch(`${API_BASE_URL}/software-bids`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bid),
    });
    if (!response.ok) {
      throw new Error("Failed to update bid");
    }
    const data = await response.json();
    return {
      id: data.id,
      company: data.company,
      services: data.services.map((service: any) => ({
        softwareService: {
          id: service.softwareService.id,
          title: service.softwareService.title,
          description: service.softwareService.description,
          image: service.softwareService.image,
          price: service.softwareService.price,
          status: service.softwareService.status,
        },
        count: service.count,
        grade: service.grade,
        sum: service.sum,
      })),
      sum: data.sum,
    } as Bid;
  },

  // Удаление заявки
  async deleteBid(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/software-bids/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete bid");
    }
  },

  // Добавление услуги в заявку
  async addServiceToBid(service: CartItem): Promise<Bid> {
    const response = await fetch(`${API_BASE_URL}/add-software/${service.softwareService.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(service),
    });
    if (!response.ok) {
      throw new Error("Failed to add service to bid");
    }
    const data = await response.json();
    return {
      id: data.id,
      company: data.company,
      services: data.services.map((service: any) => ({
        softwareService: {
          id: service.softwareService.id,
          title: service.softwareService.title,
          description: service.softwareService.description,
          image: service.softwareService.image,
          price: service.softwareService.price,
          status: service.softwareService.status,
        },
        count: service.count,
        grade: service.grade,
        sum: service.sum,
      })),
      sum: data.sum,
    } as Bid;
  },

  // Удаление услуги из заявки
  async removeServiceFromBid(serviceId: number): Promise<Bid> {
    const response = await fetch(`${API_BASE_URL}/delete-software-from-bid/${serviceId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to remove service from bid");
    }
    const data = await response.json();
    return {
      id: data.id,
      company: data.company,
      services: data.services.map((service: any) => ({
        softwareService: {
          id: service.softwareService.id,
          title: service.softwareService.title,
          description: service.softwareService.description,
          image: service.softwareService.image,
          price: service.softwareService.price,
          status: service.softwareService.status,
        },
        count: service.count,
        grade: service.grade,
        sum: service.sum,
      })),
      sum: data.sum,
    } as Bid;
  }
};