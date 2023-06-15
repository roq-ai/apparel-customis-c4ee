import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  body_measurements: string;
  customizations: string;
  status: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  body_measurements?: string;
  customizations?: string;
  status?: string;
  organization_id?: string;
}
