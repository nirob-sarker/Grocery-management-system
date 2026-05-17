import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Staff/Admin: list all orders' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'status', required: false, example: 'pending' })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STAFF, UserRole.ADMIN)
  @Get()
  listAll(@Query('status') status?: string, @Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.ordersService.listAll({
      status,
      limit: Number(limit ?? 20),
      offset: Number(offset ?? 0),
    });
  }

  @ApiOperation({ summary: 'Customer places order (reduces stock)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  @Post()
  place(@CurrentUser() user: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.placeOrder(user, dto);
  }

  @ApiOperation({ summary: 'Customer gets my orders' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  @Get('myorders')
  myOrders(@CurrentUser() user: any) {
    return this.ordersService.myOrders(user.id);
  }

  @ApiOperation({ summary: 'Get order details (owner customer or staff/admin)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  details(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersService.orderDetails(id, user);
  }

  @ApiOperation({ summary: 'Update order status (staff/admin)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STAFF, UserRole.ADMIN)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @CurrentUser() user: any, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, user, dto);
  }

  @ApiOperation({ summary: 'Cancel order (customer own pending OR admin any)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  @Delete(':id')
  cancel(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersService.cancelOrder(id, user);
  }
}
