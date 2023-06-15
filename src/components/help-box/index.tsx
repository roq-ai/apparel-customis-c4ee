import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Store Manager'];
  const roles = ['Store Manager'];
  const applicationName = 'Apparel Customisation Order app';
  const tenantName = 'Organization';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Title: Store Manager creates a new customization order

As a Store Manager,
I want to create a new customization order for a customer,
So that I can keep track of the customer's requirements and order progress.

Acceptance Criteria:
- Store Manager can input customer contact details.
- Store Manager can input customer body measurements.
- Store Manager can select customizations required.
- Store Manager can mark the order status as per the readiness.
- Store Manager can send order information to the customer via email.

Title: Store Manager updates a customization order

As a Store Manager,
I want to update an existing customization order,
So that I can make changes to the customer's requirements or order progress.

Acceptance Criteria:
- Store Manager can edit customer contact details.
- Store Manager can edit customer body measurements.
- Store Manager can edit customizations required.
- Store Manager can update the order status as per the readiness.
- Store Manager can resend order information to the customer via email.

Title: Store Manager views a list of customization orders

As a Store Manager,
I want to view a list of all customization orders,
So that I can manage and prioritize the orders efficiently.

Acceptance Criteria:
- Store Manager can view a list of all customization orders.
- Store Manager can filter the list by order status or customer details.

Title: Store Manager deletes a customization order

As a Store Manager,
I want to delete a customization order,
So that I can remove orders that are no longer needed or were created by mistake.

Acceptance Criteria:
- Store Manager can delete a customization order from the list of orders.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
