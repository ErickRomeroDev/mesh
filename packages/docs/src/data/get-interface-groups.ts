import getInterface from './get-interface';
import { findObjectInArray } from './utils';

export default function getInterfaceGroups(name: string) {
  const thisInterface = getInterface(name);

  const groups = thisInterface.groups.map((group: any) => {
    return {
      title: group.title,
      children: group.children
        .map((id: number) => {
          return findObjectInArray({
            array: thisInterface.children,
            key: 'id',
            value: id,
          });
        })
        .filter((child: any) => {
          if (child.flags.isPrivate == true || child.flags.isProtected == true)
            return false;
          return true;
        }),
    };
  });

  return groups;
}
