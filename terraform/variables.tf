variable "location" {
  type    = string
  default = "Sweden Central"
}

variable "resource_group_name" {
  type    = string
  default = "rg-task3"
}

variable "acr_name_prefix" {
  type    = string
  default = "task3acr" # prefix + random suffix => unikt
}

variable "aks_name" {
  type    = string
  default = "aks-task3"
}

variable "dns_prefix" {
  type    = string
  default = "task3"
}

variable "vm_size" {
  type    = string
  default = "standard_b2as_v2"
}
