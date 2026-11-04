import type {OnChangePageParameters} from "./types.ts";
import {getCopy} from "../service/CopyService.ts";

export type Page = 'home' | 'records' | 'dataSources';

export function SideNavigation({
  onChangePage
}: {
  onChangePage: (args: OnChangePageParameters) => void;
}) {
  return (
    <div className={'side-navigation'}>
      <span
        className={'side-nav--item'}
        onClick={() => onChangePage({page: 'home'})}
      >
        {getCopy('navigationHome')}
      </span>
      <span
        className={'side-nav--item'}
        onClick={() => onChangePage({page: 'records'})}
      >
        {getCopy('navigationRecords')}
      </span>
      <span
        className={'side-nav--item'}
        onClick={() => onChangePage({page: 'dataSources'})}
      >
        {getCopy('navigationDataSources')}
      </span>
    </div>
  );
}
