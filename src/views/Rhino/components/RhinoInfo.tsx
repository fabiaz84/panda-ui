import React, { useEffect, useState } from 'react'
import { SpinnerLoader } from 'components/Loader'
import BigNumber from 'bignumber.js'
import useBao from 'hooks/base/useBao'
import useRhinoPandaBalance from 'hooks/base/useRhinoPandaBalance'
import { StatWrapper, UserStat, UserStatsContainer, UserStatsWrapper } from 'components/Stats'
import { Row } from 'react-bootstrap'
import { getDisplayBalance, truncateNumber } from 'utils/numberFormat'
import { useRhinoSwapWithdrawableBalance } from '../../../hooks/base/useWithdrawableBalance'

const RhinoInfo: React.FC = () => {
	const bao = useBao()
	const pandaBalance = useRhinoPandaBalance(bao && bao.getContract('bao').options.address)
	const rhinoBalance = useRhinoPandaBalance(bao && bao.getContract('rhino').options.address)
	const withdrawableBalance = useRhinoSwapWithdrawableBalance()
	const withdrawableBalanceRhino = useRhinoSwapWithdrawableBalance().dividedBy(100).multipliedBy(92)

	return (
		<Row style={{ display: 'flex', flexWrap: 'wrap', width: '500px' }}>
			<UserStatsContainer>
				<UserStatsWrapper>
					<StatWrapper>
						<UserStat>
							<h1>Withdrawable Rhino</h1>
							{rhinoBalance ? (
								window.screen.width > 1200 ? (
									getDisplayBalance(withdrawableBalanceRhino, 9)
								) : (
									getDisplayBalance(withdrawableBalanceRhino, 9)
								)
							) : (
								<SpinnerLoader />
							)}
						</UserStat>
					</StatWrapper>
					<StatWrapper>
						<UserStat>
							<h1>Withdrawable Panda</h1>
							{pandaBalance ? (
								window.screen.width > 1200 ? (
									getDisplayBalance(withdrawableBalance, 9)
								) : (
									truncateNumber(withdrawableBalance, 9)
								)
							) : (
								<SpinnerLoader />
							)}
						</UserStat>
					</StatWrapper>
				</UserStatsWrapper>
			</UserStatsContainer>
		</Row>
	)
}

export default RhinoInfo
