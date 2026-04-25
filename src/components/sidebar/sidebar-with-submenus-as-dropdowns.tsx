import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { MoreHorizontal, type LucideIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { GalleryVerticalEnd } from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { SidebarOptInForm } from '@/components/sidebar-opt-in-form'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Installation',
          url: '#',
        },
        {
          title: 'Project Structure',
          url: '#',
        },
      ],
    },
    {
      title: 'Build Your Application',
      url: '#',
      items: [
        {
          title: 'Routing',
          url: '#',
        },
        {
          title: 'Data Fetching',
          url: '#',
          isActive: true,
        },
        {
          title: 'Rendering',
          url: '#',
        },
        {
          title: 'Caching',
          url: '#',
        },
        {
          title: 'Styling',
          url: '#',
        },
        {
          title: 'Optimizing',
          url: '#',
        },
        {
          title: 'Configuring',
          url: '#',
        },
        {
          title: 'Testing',
          url: '#',
        },
        {
          title: 'Authentication',
          url: '#',
        },
        {
          title: 'Deploying',
          url: '#',
        },
        {
          title: 'Upgrading',
          url: '#',
        },
        {
          title: 'Examples',
          url: '#',
        },
      ],
    },
    {
      title: 'API Reference',
      url: '#',
      items: [
        {
          title: 'Components',
          url: '#',
        },
        {
          title: 'File Conventions',
          url: '#',
        },
        {
          title: 'Functions',
          url: '#',
        },
        {
          title: 'next.config.js Options',
          url: '#',
        },
        {
          title: 'CLI',
          url: '#',
        },
        {
          title: 'Edge Runtime',
          url: '#',
        },
      ],
    },
    {
      title: 'Architecture',
      url: '#',
      items: [
        {
          title: 'Accessibility',
          url: '#',
        },
        {
          title: 'Fast Refresh',
          url: '#',
        },
        {
          title: 'Next.js Compiler',
          url: '#',
        },
        {
          title: 'Supported Browsers',
          url: '#',
        },
        {
          title: 'Turbopack',
          url: '#',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <SidebarOptInForm />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <DropdownMenu key={item.title}>
            <SidebarMenuItem>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  {item.title} <MoreHorizontal className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              {item.items?.length ? (
                <DropdownMenuContent
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                  className="min-w-56 rounded-lg"
                >
                  {item.items.map((item) => (
                    <DropdownMenuItem asChild key={item.title}>
                      <a href={item.url}>{item.title}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              ) : null}
            </SidebarMenuItem>
          </DropdownMenu>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export function SidebarOptInForm() {
  return (
    <Card className="gap-2 py-4 shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">Subscribe to our newsletter</CardTitle>
        <CardDescription>
          Opt-in to receive updates and news about the sidebar.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <form>
          <div className="grid gap-2.5">
            <SidebarInput type="email" placeholder="Email" />
            <Button
              className="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
              size="sm"
            >
              Subscribe
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default function SidebarWithSubmenusAsDropdowns() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
