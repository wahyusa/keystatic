import { useRef } from 'react';
import { useOverlayTrigger } from '@react-aria/overlays';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { ArgTypes, storiesOf } from '@voussoir/storybook';

import { ActionButton } from '@voussoir/button';
import { Box, Flex } from '@voussoir/layout';
import { Text } from '@voussoir/typography';

import { Placement, Popover } from '../src';

storiesOf('Components/Popover', module)
  .add('default', () => {
    let triggerRef = useRef<HTMLButtonElement>(null);
    let state = useOverlayTriggerState({ isOpen: true });
    let { triggerProps, overlayProps } = useOverlayTrigger(
      { type: 'dialog' },
      state,
      triggerRef
    );

    return (
      <>
        <ActionButton {...triggerProps} ref={triggerRef}>
          Always open
        </ActionButton>
        <Popover {...overlayProps} triggerRef={triggerRef} state={state}>
          <Box padding="xlarge" maxWidth="100%" UNSAFE_style={{ width: 320 }}>
            <Text>
              Popovers are small overlays that open on demand. They let users
              access additional content and actions without cluttering the page.
            </Text>
          </Box>
        </Popover>
      </>
    );
  })
  .add(
    'placement',
    (args: ArgTypes) => {
      let placement = args.placement as unknown as Placement;
      let targetRef = useRef<HTMLButtonElement>(null);
      let overlayRef = useRef<HTMLDivElement>(null);

      let state = useOverlayTriggerState({ defaultOpen: false });
      let { triggerProps, overlayProps } = useOverlayTrigger(
        { type: 'dialog' },
        state,
        targetRef
      );

      return (
        <Flex direction="column" gap="regular">
          <ActionButton {...triggerProps} ref={targetRef}>
            Toggle
          </ActionButton>
          <Popover
            triggerRef={targetRef}
            state={state}
            ref={overlayRef}
            {...args}
            {...overlayProps}
          >
            <Flex direction="column" padding="large" gap="regular">
              <Text
                weight="semibold"
                color="neutralEmphasis"
                casing="capitalize"
              >
                {placement}
              </Text>
              <Text>Adjust placement from the control panel.</Text>
            </Flex>
          </Popover>
        </Flex>
      );
    },
    {
      argTypes: {
        hideArrow: { control: 'boolean', defaultValue: false },
        placement: {
          defaultValue: 'bottom',
          control: {
            type: 'select',
            options: [
              'bottom',
              'bottom left',
              'bottom right',
              'bottom start',
              'bottom end',
              'top',
              'top left',
              'top right',
              'top start',
              'top end',
              'left',
              'left top',
              'left bottom',
              'start',
              'start top',
              'start bottom',
              'right',
              'right top',
              'right bottom',
              'end',
              'end top',
              'end bottom',
            ] as const,
          },
        },
      },
    }
  );
