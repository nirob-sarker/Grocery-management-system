import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { InventoryService } from './inventory.service';
import { RestockDto } from './dto/restock.dto';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Restock product (Staff/Admin)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STAFF, UserRole.ADMIN)
  @Post('restock')
  restock(@Body() dto: RestockDto) {
    return this.inventoryService.restock(dto);
  }

  @ApiOperation({ summary: 'Inventory report (Staff/Admin)' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'threshold', required: false, example: 5 })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STAFF, UserRole.ADMIN)
  @Get('report')
  report(@Query('threshold') threshold?: string) {
    const n = threshold ? Number(threshold) : undefined;
    return this.inventoryService.report(Number.isFinite(n as any) ? n : undefined);
  }

  @ApiOperation({ summary: 'Inventory logs (Staff/Admin)' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STAFF, UserRole.ADMIN)
  @Get('logs')
  logs(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.inventoryService.logs(Number(limit ?? 20), Number(offset ?? 0));
  }
}
